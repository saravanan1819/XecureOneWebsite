const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.TO_EMAIL,
    subject: "New Contact Form Submission",
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Location:</strong> ${formData.location}</p>
      <p><strong>Company Type:</strong> ${formData.companyType}</p>
      <p><strong>Message:</strong> ${formData.message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
