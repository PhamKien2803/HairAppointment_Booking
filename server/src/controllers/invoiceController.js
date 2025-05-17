const mongoose = require("mongoose");
const Invoice = require("../models/Invoice");
const Customer = require("../models/Customer");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const Voucher = require("../models/Voucher");

exports.createInvoice = async (req, res) => {
    try {
        const { customerId, employeeId, services, vouchers } = req.body;
        console.log("vouchers",vouchers);

       
        const customer = await Customer.findById(customerId);
        if (!customer) return res.status(404).json({ message: "Not found customer" });


        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ message: "Not found employee" });

        const serviceDataList = await Promise.all(
            services.map(async (service) => {
                const serviceData = await Service.findById(service.serviceId);
                if (!serviceData) throw new Error(`Not found service: ${service.serviceId}`);
                return serviceData;
            })
        );

        const customerData = await Customer.findById(customerId).populate("voucherId", "code discount");
        if (!customerData) return res.status(404).json({ message: "Customer not found" });

        const customerVouchers = customerData.voucherId || [];
        const requestedVoucherIds = vouchers.map(v => v.voucherId);

        // Tìm voucher không hợp lệ
        const missingVouchers = requestedVoucherIds.filter(
            voucherId => !customerVouchers.some(cv => cv._id.toString() === voucherId)
        );

        if (missingVouchers.length > 0) {
            return res.status(404).json({ message: "Not found voucher", missingVouchers });
        }

        const newInvoice = new Invoice(req.body);
        const savedInvoice = await newInvoice.save();
        const result = await Customer.updateOne(
            { _id: customerId },
            { $pull: { voucherId: { $in: requestedVoucherIds } } } 
        );
       console.log("result",result);

        return res.status(201).json(savedInvoice);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;

        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        if (body.customerId) {
            const customer = await Customer.findById(body.customerId);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            invoice.customerId = body.customerId;
        }

        if (body.employeeId) {
            const employee = await Employee.findById(body.employeeId);
            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }
            invoice.employeeId = body.employeeId;
        }

        if (body.services) {
            const updatedServices = await Promise.all(
                body.services.map(async (service) => {
                    const serviceData = await Service.findById(service.serviceId);
                    if (!serviceData) {
                        throw new Error(`Service not found: ${service.serviceId}`);
                    }
                    return service;
                })
            );
            invoice.services = updatedServices;
        }

        if (body.vouchers) {
            const updatedVouchers = await Promise.all(
                body.vouchers.map(async (voucher) => {
                    const voucherData = await Voucher.findById(voucher.voucherId);
                    if (!voucherData) {
                        throw new Error(`Voucher not found: ${voucher.voucherId}`);
                    }
                    return voucher;
                })
            );
            invoice.vouchers = updatedVouchers;
        }

        if (body.paymentMethod) {
            invoice.paymentMethod = body.paymentMethod;
        }

        if (body.paymentStatus) {
            invoice.paymentStatus = body.paymentStatus;
        }

        await invoice.save();
        return res.status(200).json(invoice);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        
        const invoice = await Invoice.findById(id);
        
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        console.log("invoice.paymentStatus", invoice.paymentStatus);
        if (invoice.paymentStatus === 'paid') {
            return res.status(400).json({ message: "Cannot delete invoice. Invoice status is paid" });
        }

        await Invoice.findByIdAndDelete(id);
        return res.json({ message: "Deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


