const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên dịch vụ là bắt buộc"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Giá dịch vụ là bắt buộc"],
    min: [0, "Giá dịch vụ không được nhỏ hơn 0"]
  },
  duration: {
    type: Number,
    required: [true, "Thời gian thực hiện là bắt buộc"],
    min: [1, "Thời gian thực hiện phải lớn hơn 0 phút"]
  },
  description: {
    type: String,
    trim: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ServiceSchema.pre("save", function (next) {
  if (this.name) {
    this.name = this.name.trim();
  }
  if (this.description) {
    this.description = this.description.trim();
  }
  next();
});

module.exports = mongoose.model("Service", ServiceSchema);
