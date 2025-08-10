// const jwt = require("jsonwebtoken");
// const SendOTP = require("../utils/OTPsender");

// // let ADMIN_EMAIL = "727723eucy028@skcet.ac.in";
// // let ADMIN_PASSWORD = "admin123";
// const ADMIN_EMAIL="admin@example.com";
// const ADMIN_PASSWORD="admin123";

// exports.loginAdmin = (req, res) => {
//   const { email, password } = req.body;

//   if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });

//   res.status(200).json({ message: "Login successful", token });
// };

// const otpStore = {};
// let adminCredentials = { email: ADMIN_EMAIL, password: ADMIN_PASSWORD };

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
// }

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   if (email !== adminCredentials.email) {
//     return res.status(400).json({ message: "Admin email not found." });
//   }

//   const otp = generateOTP();
//   const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

//   otpStore[email] = { otp, expiresAt };

//   try {
//     await SendOTP(
//       email,
//       `Your OTP: ${otp}`,
//       `Use this OTP to reset your password. It expires in 5 minutes.`
//     );
//     res.json({ message: "OTP sent successfully." });
//   } catch (err) {
//     console.error("Error sending OTP:", err);
//     res.status(500).json({ message: "Failed to send OTP." });
//   }
// };

// exports.verifyOTP = (req, res) => {
//   const { email, otp } = req.body;
//   const record = otpStore[email];

//   if (!record) return res.status(400).json({ message: "OTP not found." });
//   if (Date.now() > record.expiresAt)
//     return res.status(400).json({ message: "OTP expired." });
//   if (record.otp !== otp)
//     return res.status(400).json({ message: "Invalid OTP." });

//   res.json({ message: "OTP verified successfully." });
// };

// exports.resetPassword = (req, res) => {
//   const { email, newPassword } = req.body;
//   const record = otpStore[email];

//   if (!record)
//     return res.status(400).json({ message: "OTP verification required." });

//   if (Date.now() > record.expiresAt)
//     return res.status(400).json({ message: "OTP expired." });

//   ADMIN_PASSWORD = newPassword;

//   delete otpStore[email];

//   res.json({ message: "Password updated successfully." });
// };

const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SendOTP = require("../utils/OTPsender");
let otpStorage = {};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
