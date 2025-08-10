const contact = require("../models/ContactMessages");
const sendEmail = require("../utils/sendEmail");

exports.PostContact = async (req, res) => {
  const { name, email, location, companyType, message } = req.body;

  if (!name || !email || !location || !companyType || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const newMsg = new contact({ name, email, location, companyType, message });
    try {
      await sendEmail({ name, email, location, companyType, message });
      await newMsg.save();
      res.json({ message: "Form submitted and email sent successfully." });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      res.status(207).json({ message: "Failed to send email." });
    }
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: "Failed to submit contact form." });
  }
};

exports.getContact = async (req, res) => {
  try {
    const contacts = await contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
