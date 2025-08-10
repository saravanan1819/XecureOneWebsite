// import React, { useState } from "react";
// import "../styles/ReshedulePopup.css";

// const ReschedulePopup = ({ booking, onClose, onReschedule }) => {
//   const [date, setDate] = useState(booking.date || "");
//   const [time, setTime] = useState(booking.time || "");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onReschedule(booking._id, date, time);
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <h3>Reschedule Appointment</h3>
//         <form onSubmit={handleSubmit}>
//           <label>Date:</label>
//           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

//           <label>Time:</label>
//           <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />

//           <div className="popup-actions">
//             <button type="submit" className="btn-submit">Update</button>
//             <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ReschedulePopup;


import React, { useState } from "react";
import "../styles/ReshedulePopup.css";
import { toast } from "react-toastify";

const ReschedulePopup = ({ booking, onClose, onReschedule }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (!date || !time) {
      toast.warning("Please select both date and time");
      return;
    }
    onReschedule(booking._id, date, time);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h3>Reschedule Appointment</h3>
        <p><strong>Booking for:</strong> {booking.name}</p>

        <label>
          New Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          New Time:
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <div className="popup-buttons">
          <button className="update-btn" onClick={handleSubmit}>Update</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>

      </div>
    </div>
  );
};

export default ReschedulePopup;
