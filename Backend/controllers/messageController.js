const contact = require("../models/ContactMessages");
const sendEmail = require("../utils/AdminMailer");
const sendResponseEmail = require("../utils/ResponseMailer");
const { appendContactToSheet, updateContactStatusInSheet} = require("../utils/GoogleSheets");

exports.PostMessages = async (req, res) => {
  const { name, email, location, companyType, message } = req.body;

  if (!name || !email || !location || !companyType || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const newMsg = new contact({ name, email, location, companyType, message });
    try {
      await sendEmail({ name, email, location, companyType, message });
      await newMsg.save();
      res.json({
        message: "Form submitted and email sent successfully.",
        newMsg,
      });
      await appendContactToSheet({
        name: req.body.name,
        email: req.body.email,
        location: req.body.location,
        companyType: req.body.companyType,
        message: req.body.message,
        status: "new",
      });
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      res.status(207).json({ message: "Failed to send email." });
    }
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: "Failed to submit contact form." });
  }
};

exports.getNewMessages = async (req, res) => {
  try {
    const contacts = await contact
      .find({ status: "new" })
      .sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getRepliedMessages = async (req, res) => {
  try {
    const contacts = await contact
      .find({ status: "Replied" })
      .sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.replyToUserMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const cnt = await contact.findById(id);
    if (!cnt) {
      return res.status(404).json({ error: "Message not found" });
    }
    const { email, name, reply, status } = req.body;

    if (!email || !reply) {
      return res.status(400).json({ error: "Email and reply are required." });
    }
    const subject = "Reply from Admin - Regarding Your Message";
    const text = `Hello ${name || "User"},\n\n${reply}\n\nRegards,\nAdmin Team`;

    await sendResponseEmail({ to: email, subject, text });
    await updateContactStatusInSheet(email, name);

    res.status(200).json({ message: "Reply sent successfully." });

    cnt.status = status || cnt.status;
    await cnt.save();
  } catch (error) {
    console.error("Reply email error:", error);
    res.status(500).json({ error: "Failed to send reply." });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const message = await contact.findById(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.status = status;
    await message.save();

    res.status(200).json({ message: "Message status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

