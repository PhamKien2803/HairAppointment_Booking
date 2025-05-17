const Appointment = require("../models/Appointment");
const Customer = require("../models/Customer");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const Branch = require("../models/Branches");
const WorkSchedule = require("../models/WorkSchedule");


exports.createAppointment = async (req, res) => {
    try {
        const body = req.body;
        const customer = await Customer.findById(body.customerId);
        console.log("🚀 ~ exports.createAppointment= ~ customer:", customer)
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        const employee = await Employee.findById(body.employeeId).populate("workScheduleId");
        console.log("🚀 ~ exports.createAppointment= ~ employee:", employee)
        if (!employee) return res.status(404).json({ message: "Employee not found" });

  
        const service = await Service.findById(body.serviceId);
        console.log("🚀 ~ exports.createAppointment= ~ service:", service)
        if (!service) return res.status(404).json({ message: "Service not found" });


        const branch = await Branch.findById(body.branchId);
        console.log("🚀 ~ exports.createAppointment= ~ branch:", branch)
        if (!branch) return res.status(404).json({ message: "Branch not found" });
        
        const newData = new Appointment(req.body);
        const savedData = await newData.save();
        if (employee.workScheduleId) {
            const appointmentTime = body.appointmentTime;

            const workSchedule = await WorkSchedule.findOne({ _id: employee.workScheduleId });
            if (workSchedule) {
                const slot = workSchedule.slots.find(slot => slot.startTime.getTime() === new Date(appointmentTime).getTime());     
                if (slot) {
                    slot.isBooked = true;
                    await workSchedule.save();
                } else {
                    return res.status(404).json({message: "Không tìm thấy slot phù hợp!"});
                }
            }
            
        }
        return res.status(201).json(savedData);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



exports.updateAppointment = async (req, res) => {
    try {
        const body = { ...req.body }; 
        delete body._id; 

        const customer = await Customer.findById(body.customerId);
        if (!customer) return res.status(404).json({ message: "Customer not found" });

        const employee = await Employee.findById(body.employeeId).populate("workScheduleId");
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const service = await Service.findById(body.serviceId);
        if (!service) return res.status(404).json({ message: "Service not found" });

        const branch = await Branch.findById(body.branchId);
        if (!branch) return res.status(404).json({ message: "Branch not found" });

     
        const oldAppointment = await Appointment.findById(req.params.id);
        if (!oldAppointment) return res.status(404).json({ message: "Appointment not found" });

        if (oldAppointment.employeeId.toString() !== body.employeeId || oldAppointment.appointmentTime !== body.appointmentTime) {
            const oldEmployee = await Employee.findById(oldAppointment.employeeId).populate("workScheduleId");

            if (oldEmployee?.workScheduleId) {
                const oldSchedule = await WorkSchedule.findById(oldEmployee.workScheduleId);
                if (oldSchedule) {
                    const oldSlot = oldSchedule.slots.find(slot => slot.startTime.getTime() === new Date(oldAppointment.appointmentTime).getTime());
                    if (oldSlot) {
                        oldSlot.isBooked = false; 
                        await oldSchedule.save();
                    }
                }
            }

            if (employee.workScheduleId) {
                const newSchedule = await WorkSchedule.findById(employee.workScheduleId);
                if (newSchedule) {
                    const newSlot = newSchedule.slots.find(slot => slot.startTime.getTime() === new Date(body.appointmentTime).getTime());
                    if (newSlot) {
                        newSlot.isBooked = true; 
                        await newSchedule.save();
                    } else {
                        return res.status(404).json({message: "Không tìm thấy slot phù hợp cho lịch làm việc mới!"});
                    }
                }
            }
        }

        const updatedData = await Appointment.findByIdAndUpdate(req.params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedData) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.json(updatedData);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.deleteAppointment = async (req, res) => {
    try {
        const id = req.params.id;

        const appointment = await Appointment.findById(id).populate("employeeId");
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        if (appointment.status === "confirmed") {
            return res.status(400).json({ message: "Cannot delete because status is confirmed" });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (appointment.employeeId && appointment.employeeId.workScheduleId) {
            const workSchedule = await WorkSchedule.findById(appointment.employeeId.workScheduleId);
            if (workSchedule) {
                const slot = workSchedule.slots.find(
                    (slot) => new Date(slot.startTime).getTime() === new Date(appointment.appointmentTime).getTime()
                );
                if (slot) {
                    slot.isBooked = false; 
                    await workSchedule.save(); 
                }
            }
        }

        res.json({ message: `Deleted successfully`, deletedAppointment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAppoinmentByCustomerName = async (req,res) => {
    try{
        const customerName = req.params.name;
        console.log("🚀 ~ exports.getAppoinmentByCustomerName= ~ customerName:", customerName);
        const customer = await Customer.findOne({fullName: customerName});
        console.log("🚀 ~ exports.getAppoinmentByCustomerName= ~ customer:", customer);
        if(!customer){
            return res.status(404).json({message: "Customer not found"});
        }
         const appointments = await Appointment.find({ customerId: customer._id })
         .populate("customerId") 
         .populate("employeeId") 
         .populate("serviceId")  
         .populate("branchId")    
         .sort({ appointmentTime: 1 });   

     if (appointments.length === 0) {
         return res.status(404).json({ message: "No appointments found for this customer" });
     }
     res.json(appointments); 
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getAppoinmentByStatus = async (req, res) => {
    try {
        const statusCode = req.params.status; 
        console.log("🚀 ~ exports.getAppoinmentByStatus ~ statusCode:", statusCode);
        const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
        if (!validStatuses.includes(statusCode)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const appointments = await Appointment.find({ status: statusCode })
            .populate("customerId")
            .populate("employeeId")
            .populate("serviceId")
            .populate("branchId")
            .sort({ appointmentTime: 1 }); 

        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found with this status" });
        }

        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getAppoinmentByCustomerTimer = async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const data = await Appointment.find({
            customerId: customerId,
        })
        .populate("customerId")
        .populate("employeeId")
        .populate("serviceId")
        .populate("branchId");

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getListBarberAvailable = async (req, res) => {
    try {
        const { date, branchId } = req.params;

        if (!date || !branchId) {
            return res.status(400).json({ message: "Date and Branch ID are required" });
        }

        const targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        console.log("🚀 ~ Target Date:", targetDate);
        console.log("🚀 ~ Branch ID:", branchId);

        const barbers = await Employee.find({ position: "barber", branchId }).populate("workScheduleId");
        console.log("🚀 ~ Barber List:", barbers);

        // Kiểm tra xem thợ có sẵn trong ngày được chọn không
        const availableBarbers = barbers.filter((barber) => {
            if (!barber.workScheduleId) return false;

            return barber.workScheduleId.slots.some(
                (slot) => new Date(slot.startTime).getTime() === targetDate.getTime() && !slot.isBooked
            );
        });

        console.log("🚀 ~ Available Barbers:", availableBarbers);

        res.json(availableBarbers.map(b => ({
            id: b._id,
            fullName: b.fullName,
            gender: b.gender,
            star: b.star
        })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



  

