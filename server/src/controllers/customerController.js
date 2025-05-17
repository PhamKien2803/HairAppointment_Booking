const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const validator = require("validator");

// Cập nhật thông tin khách hàng
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone, email, gender, dob } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Kiểm tra email hợp lệ
    if (email && !validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Cập nhật thông tin
    customer.fullName = fullName || customer.fullName;
    customer.phone = phone || customer.phone;
    customer.email = email || customer.email;
    customer.gender = gender || customer.gender;
    customer.dob = dob || customer.dob;

    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Lấy danh sách voucher của khách hàng
exports.getListVoucherById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const customer = await Customer.findById(id).populate(
      "voucherId",
      "code discount"
    );

    if (!customer || !customer.voucherId.length) {
      return res.status(404).json({ message: "No vouchers found" });
    }

    return res.status(200).json({
      success: true,
      vouchers: customer.voucherId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Import các chức năng chung từ use.controller
const {
  findAllGenericRef,
  findIdGenericRef,
  createGeneric,
  updateGeneric,
  deleteGeneric,
} = require("../controllers/use.controller");

// Xuất các controller chung
module.exports = {
  getAllCustomers: findAllGenericRef(Customer, ["branchId", "voucherId"]),
  getCustomerById: findIdGenericRef(Customer, ["branchId", "voucherId"]),
  createCustomer: createGeneric(Customer, "Customer"),
  updateCustomer: updateGeneric(Customer, "Customer"),
  deleteCustomer: deleteGeneric(Customer, "Customer"),
  updateProfile: exports.updateProfile,
  getListVoucherById: exports.getListVoucherById,
};
