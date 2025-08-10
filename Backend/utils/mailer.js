const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // change from 465 to 587
  secure: false, // false for port 587, true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // use app password if 2FA enabled
  },
  tls: {
    rejectUnauthorized: false, // allow self-signed certs (optional)
  },
});

// const sendEmail = async (to, subject, html) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       html,
//     });
//     console.log(`Email sent to ${to}`);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

const sendEmail = async (to, subject, html) => {
  try {
    return transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
