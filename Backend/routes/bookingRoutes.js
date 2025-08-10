const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createBooking,
  getAllBookings,
  updateBooking,
  getSingleBooking,
  getNewBookings,
  getPendingBookings,
  updateBookingStatus,
  rescheduleBooking
} = require("../controllers/bookingController");

router.post("/", createBooking);
router.get("/", authMiddleware, getAllBookings);
router.get("/:id", authMiddleware, getSingleBooking);
router.get("/new", authMiddleware, getNewBookings);
router.get("/pending", authMiddleware, getPendingBookings);
router.put("/:id", authMiddleware, updateBooking);
router.put("/reschedule/:id", authMiddleware, rescheduleBooking);

module.exports = router;
