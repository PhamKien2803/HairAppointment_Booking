const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const AccountSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["customer", "receptionist", "barber", "admin"],
      required: true,
      default: "customer",
    },
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email format"],
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "Username must be at least 4 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    otp: { type: String, default: null },
    otpExpiration: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

AccountSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Account", AccountSchema);
