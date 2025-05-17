const mongoose = require("mongoose");

const WorkScheduleSchema = new mongoose.Schema({
  slots: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      startTime: { type: Date, required: true },
      isBooked: { type: Boolean, default: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WorkSchedule", WorkScheduleSchema);
