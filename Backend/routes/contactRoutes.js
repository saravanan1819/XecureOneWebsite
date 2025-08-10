const express = require("express");
const router = express.Router();
const { PostContact,getContact } = require("../controllers/contactController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/post", PostContact);
router.get("/get",authMiddleware, getContact);
module.exports = router;
