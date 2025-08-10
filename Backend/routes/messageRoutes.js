const express = require("express");
const router = express.Router();
const {
  PostMessages,
  getNewMessages,
  replyToUserMessage,
  getRepliedMessages,
  updateMessageStatus,
} = require("../controllers/messageController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/post", PostMessages);
router.post("/reply/:id", authMiddleware, replyToUserMessage);
router.get("/get-new", authMiddleware, getNewMessages);
router.get("/get-replied", authMiddleware, getRepliedMessages);
router.put("/update-status/:id", authMiddleware, updateMessageStatus);

module.exports = router;