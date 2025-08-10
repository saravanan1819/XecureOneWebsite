const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

exports.updateAdmin = async (req, res) => {
  const { currentEmail, newEmail, newPassword, confirmPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email: currentEmail });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    admin.email = newEmail;
    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ message: "Credentials updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
    console.log(err);
  }
};

exports.changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect current password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

