const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    dob: { type: Date },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    voucherId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voucher" }],
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Customer", CustomerSchema);
