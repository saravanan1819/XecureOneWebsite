const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    location: String,
    companyType: String,
    message: String,
    status: { type: String, enum: ["new","Replied"], default: "new" },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessages", contactMessageSchema);
