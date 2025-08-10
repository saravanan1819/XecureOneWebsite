const express = require("express");
const router = express.Router();
const {
  getAppointmentStats,
  getDayWiseForecast,
  getNewMeetings,
  getPendingMeetings,
  getLatestNewMeetings,
  getLatestPendingMeetings,
  getCompletedMeetings,
  getRejectedMeetings,
  getrescheduledMeeting

} = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/stats", authMiddleware, getAppointmentStats);
router.get("/forecast", authMiddleware, getDayWiseForecast);
router.get("/new", authMiddleware, getNewMeetings);
router.get("/pending", authMiddleware, getPendingMeetings);
router.get('/dash-new', getLatestNewMeetings);
router.get('/dash-pending', getLatestPendingMeetings);
router.get('/completed',getCompletedMeetings);
router.get('/rejected',authMiddleware, getRejectedMeetings);
router.get('/rescheduled',authMiddleware, getrescheduledMeeting);
module.exports = router;
