const Booking = require("../models/Booking");

exports.getAppointmentStats = async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const newCount = await Booking.countDocuments({ status: "new" });
    const pending = await Booking.countDocuments({ status: "accepted" });
    const completed = await Booking.countDocuments({ status: "completed" });
    const rejected = await Booking.countDocuments({ status: "rejected" });
    const rescheduled = await Booking.countDocuments({ status: "rescheduled" });

    res.status(200).json({
      total,
      new: newCount,
      pending,
      completed,
      rejected,
      rescheduled,
    });
  } catch (error) {
    console.error("Error getting booking stats:", error);
    res.status(500).json({ error: "Failed to fetch booking statistics" });
  }
};

exports.getDayWiseForecast = async (req, res) => {
  try {
    const forecast = await Booking.aggregate([
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formatted = forecast.map((item) => ({
      date: item._id,
      count: item.count,
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch forecast" });
  }
};

exports.getNewMeetings = async (req, res) => {
  const bookings = await Booking.find({ status: "new" }).sort({
    createdAt: -1,
  });
  res.json(bookings);
};

exports.getPendingMeetings = async (req, res) => {
  const bookings = await Booking.find({ status: "accepted" }).sort({
   createdAt: -1,
  });
  res.json(bookings);
};

exports.getLatestNewMeetings = async (req, res) => {
  try {
    const meetings = await Booking.find({ status: "new" })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getLatestPendingMeetings = async (req, res) => {
  try {
    const meetings = await Booking.find({ status: "accepted" })
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getCompletedMeetings = async (req,res) =>{
  try {
    const meetings = await Booking.find({ status: "completed" })
      .sort({ createdAt: -1 })
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}

exports.getRejectedMeetings =  async (req,res) =>{
  try {
    const meetings = await Booking.find({ status: "rejected" })
      .sort({ createdAt: -1 })
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
}


exports.getrescheduledMeeting = async (req, res) => {
  try{
    const meeting=await Booking.find({status: "rescheduled"})
      .sort({createdAt:-1})
    res.json(meeting);
  }
  catch(err){
    res.status(500).json({error:"Server Error"});
  }
}