const Booking = require("../models/Booking");
const {
  isValidEmailFormat,
  isDomainValid,
} = require("../utils/emailValidator");
const sendEmail = require("../utils/UserMailer");
const {
  appendToSheet,
  updateStatusInSheet,
  updateRescheduleInSheet,
} = require("../utils/GoogleSheets");

exports.createBooking = async (req, res) => {
  try {
    const { name, email, purpose, message, date, time } = req.body;

    if (!name || !email || !purpose || !date || !time || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!isValidEmailFormat(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const domainValid = await isDomainValid(email);
    if (!domainValid) {
      return res
        .status(400)
        .json({ error: "Email domain is not valid (no MX record found)" });
    }

    const booking = new Booking({ name, email, purpose, message, date, time });
    await booking.save();

    const timestamp = new Date().toLocaleString();
    const values = [
      name,
      email,
      purpose,
      message,
      date,
      time,
      "new",
      timestamp,
    ];
    await appendToSheet(values);

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.updateBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     const booking = await Booking.findById(id);
//     if (!booking) {
//       return res.status(404).json({ error: "Booking not found" });
//     }

//     booking.status = status || booking.status;

//     await booking.save();

//     if (status === "accepted") {
//       const message = `
//         <p>Dear ${booking.name},</p>
//         <p>We are pleased to inform you that your appointment has been successfully accepted.</p>
//         <p><strong>Appointment Details:</strong></p>
//         <ul>
//           <li><strong>Date:</strong> ${booking.date}</li>
//           <li><strong>Time:</strong> ${booking.time}</li>
//           <li><strong>Assigned Staff:</strong> ${
//             booking.assignedStaff || "To be assigned"
//           }</li>
//         </ul>
//         <p>If you have any questions or need to reschedule, please feel free to contact us.</p>
//         <p>Thank you for choosing our services. We look forward to meeting you!</p>
//         <p>Best regards,<br/>XecureOne Team</p>
//       `;
//       await sendEmail(
//         booking.email,
//         "Your Appointment Has Been Confirmed",
//         message
//       );
//     }
//     res.json({ message: "Booking updated successfully", booking });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    5;
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Only send email if status is accepted
    if (status === "accepted") {
      const message = `
        <p>Dear ${booking.name},</p>
        <p>We are pleased to inform you that your appointment has been successfully accepted.</p>
        <p><strong>Appointment Details:</strong></p>
        <ul>
          <li><strong>Date:</strong> ${booking.date}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
          <li><strong>Assigned Staff:</strong> ${
            booking.assignedStaff || "To be assigned"
          }</li>
        </ul>
        <p>If you have any questions or need to reschedule, please feel free to contact us.</p>
        <p>Thank you for choosing our services. We look forward to meeting you!</p>
        <p>Best regards,<br/>XecureOne Team</p>
      `;

      try {
        await sendEmail(
          booking.email,
          "Your Appointment Has Been Confirmed",
          message
        );
      } catch (emailError) {
        return res
          .status(500)
          .json({ error: "Failed to send confirmation email." });
      }
    }

    booking.status = status || booking.status;
    await booking.save();
    await updateStatusInSheet(booking.email, booking.date, booking.status);

    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rescheduleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;
    let newDate = date;
    let newTime = time;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await updateRescheduleInSheet(
      booking.email,
      booking.date,
      booking.time,
      newDate,
      newTime
    );

    booking.date = date;
    booking.time = time;
    booking.status = "rescheduled";
    await booking.save();

    const message = `
      <p>Dear ${booking.name},</p>
      <p>Your appointment has been <strong>rescheduled</strong>.</p>
      <p><strong>New Appointment Details:</strong></p>
      <ul>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Time:</strong> ${time}</li>
        <li><strong>Assigned Staff:</strong> ${
          booking.assignedStaff || "To be assigned"
        }</li>
      </ul>
      <p>We apologize for any inconvenience and appreciate your understanding.</p>
      <p>Best regards,<br/>XecureOne Team</p>
    `;

    try {
      await sendEmail(
        booking.email,
        "Your Appointment Has Been Rescheduled",
        message
      );
    } catch (emailError) {
      return res
        .status(500)
        .json({ error: "Failed to send reschedule email." });
    }

    res.json({ message: "Appointment rescheduled successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

exports.getSingleBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: "Not found" });
  res.json(booking);
};

exports.getNewBookings = async (req, res) => {
  try {
    const newBookings = await Booking.find({ status: "new" }).sort({
      createdAt: -1,
    });
    res.status(200).json(newBookings);
  } catch (error) {
    console.error("Error fetching new bookings:", error);
    res.status(500).json({ error: "Failed to fetch new bookings" });
  }
};

exports.getPendingBookings = async (req, res) => {
  try {
    const pendingBookings = await Booking.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    res.status(200).json(pendingBookings);
  } catch (error) {
    console.error("Error fetching pending bookings:", error);
    res.status(500).json({ error: "Failed to fetch pending bookings" });
  }
};
