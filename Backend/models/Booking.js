const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    purpose: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["new", "completed", "accepted", "rejected", "rescheduled"], default: "new" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
