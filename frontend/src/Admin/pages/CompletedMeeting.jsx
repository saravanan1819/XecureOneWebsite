import React from "react";
import { useState, useEffect } from "react";
import SidebarLayout from "../components/SidebarLayout";
import axios from "axios";
import "../styles/CompletedMeeting.css";
function CompletedMeeting() {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchCompletedMeetings();
  }, []);

  const fetchCompletedMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/dashboard/completed",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMeetings(res.data);
    } catch (err) {
      console.error("Error fetching new meetings:", err);
    }
  };

  return (
    <>
     <SidebarLayout>
      <div className="completed-meetings-page">
        <h2>Completed Appointments</h2>
        {meetings.length === 0 ? (
          <p>No completed appointments</p>
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
                  <div className="status">Complelted ✅</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SidebarLayout>
    </>
  );
}

export default CompletedMeeting;
