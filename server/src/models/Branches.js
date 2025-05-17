const mongoose = require("mongoose");
const constantValue = require("../constants/constant");
const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên chi nhánh là bắt buộc"],
    trim: true
  },
  address: {
    type: String,
    required: [true, "Địa chỉ chi nhánh là bắt buộc"],
    trim: true
  },
  phone: {
    type: String,
    required: [true, "Số điện thoại là bắt buộc"],
    trim: true,
    match: [constantValue.REGEX_PHONE, "Số điện thoại không hợp lệ"]
  },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("Branch", BranchSchema);
