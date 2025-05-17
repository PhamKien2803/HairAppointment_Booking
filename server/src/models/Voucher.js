const mongoose = require("mongoose");
const VoucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  minOrderValue: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Voucher", VoucherSchema);
