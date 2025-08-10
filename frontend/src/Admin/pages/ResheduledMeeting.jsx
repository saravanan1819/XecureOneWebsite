import SidebarLayout from "../components/SidebarLayout";
import { useState, useEffect } from "react";
import "../styles/PendingMeeting.css";
import axios from "axios";
import { toast } from "react-toastify";
function ResheduledMeeting() {
  const [meetings, setMeetings] = useState([]);
  useEffect(() => {
    fetchResheduledMeetings();
  }, []);

  const fetchResheduledMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/rescheduled",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMeetings(res.data);
    } catch (err) {
      toast.warning("Error fetching new meetings:", err);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Appointment status updated successfully");
        fetchResheduledMeetings();
      }
    } catch (err) {
      toast.error("Error updating status:", err);
    }
  };
  return (
    <SidebarLayout>
      <div className="pending-meetings-page">
        <h2>Resheduled Appointments</h2>
        {meetings.length === 0 ? (
          <p>No resheduled appointments</p>
        ) : (
          <ul className="meeting-list">
            {meetings.map((meeting) => (
              <li key={meeting._id} className="meeting-card">
                <div className="card-left">
                  <p>
                    <strong>Name:</strong> {meeting.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {meeting.email}
                  </p>
                  <p>
                    <strong>Purpose:</strong> {meeting.purpose}
                  </p>
                  <p>
                    <strong>Meeting Date:</strong> {meeting.date}
                  </p>
                  <p>
                    <strong>Meeting Time:</strong> {meeting.time}
                  </p>
                </div>
                <div className="card-right">
                  <p>
                    <strong>Message:</strong>
                  </p>
                  <p>{meeting.message}</p>
                </div>
                <button className="complete-button" onClick={() => updateStatus(meeting._id, "completed")}>
                  Mark as Complelted
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SidebarLayout>
  );
}
export default ResheduledMeeting;
