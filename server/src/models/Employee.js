const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    position: {
      type: String,
      enum: ["receptionist", "barber"],
      required: true,
    },
    branchId: { type: mongoose.Types.ObjectId, ref: "Branch", required: true },
    salary: { type: Number, default: 0 },
    workScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkSchedule",
    },
    star: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
