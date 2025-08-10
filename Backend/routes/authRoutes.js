const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  forgetPassword,
  verifyOTP,
  resetPassword
} = require("../controllers/authController");

router.post("/login", loginAdmin);


module.exports = router;
