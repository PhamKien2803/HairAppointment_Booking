const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
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
    services: [
      {
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: [true, "Service ID is required"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      min: [0, "Total amount must be at least 0"],
    },
    vouchers: [
      {
        voucherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Voucher",
          required: true,
        },
      },
    ],
    paymentMethod: {
      type: String,
      enum: {
        values: ["cash", "card", "online"],
        message: "Payment method must be 'cash', 'card', or 'online'",
      },
      required: [true, "Payment method is required"],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ["pending", "paid", "failed"],
        message: "Payment status must be 'pending', 'paid', or 'failed'",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

InvoiceSchema.pre("save", async function (next) {
  try {
    const invoice = this;
    const Service = mongoose.model("Service");
    const Voucher = mongoose.model("Voucher");

    let total = 0;
    for (const service of invoice.services) {
      const serviceData = await Service.findById(service.serviceId);
      if (!serviceData) {
        return next(new Error(`Service not found: ${service.serviceId}`));
      }
      total += serviceData.price * (service.quantity || 1); // Nếu quantity không có, mặc định là 1
    }

    if (invoice.vouchers.length > 0) {
      let totalDiscount = 0;

      for (const voucher of invoice.vouchers) {
        const voucherData = await Voucher.findById(voucher.voucherId);
        if (voucherData) {
          totalDiscount += voucherData.discount;
        }
      }
      total -= (total * totalDiscount) / 100;
    }

    invoice.totalAmount = Math.max(0, total);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
