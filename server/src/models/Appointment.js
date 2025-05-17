const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer ID is required"],
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: [true, "Employee ID is required"],
  },
  serviceId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: [true, "Service ID is required"],
  }],
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: [true, "Branch ID is equired"],
  },
  appointmentTime: {
    type: Date,
    required: [true, "Appointment time is required"],
    validate: {
      validator: function (value) {
        return value > new Date(); 
      },
      message: "Appointment time must be in the future",
    },
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "confirmed", "completed", "cancelled"],
      message: "Status must be one of: pending, confirmed, completed, cancelled",
    },
    default: "pending",
  }
},{timestamps: true});

module.exports = mongoose.model("Appointment", AppointmentSchema);
