const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    updateAdmin,
    changePassword
} = require("../controllers/settingController");


router.put("/update-admin",authMiddleware,updateAdmin);
router.put("/update-password",authMiddleware,changePassword);

module.exports = router;