import React, { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../components/SidebarLayout";
import ReschedulePopup from "../components/ReshedulePopUp";
import "../styles/NewMeeting.css";


import { format } from "timeago.js";
import { toast } from "react-toastify";

function NewMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [updateAcceptId, setUpdateAcceptId] = useState(null);
  const [updateRejectId, setUpdateRejectId] = useState(null);
  const [updateReschedule, setUpdateReschedule] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchNewMeetings();
  }, []);

  const fetchNewMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard/new", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMeetings(res.data);
    } catch (err) {
      console.error("Error fetching new meetings:", err);
      toast.warning("Error fetching new meetings");
    }
  };

  // const updateStatus = async (bookingId, status) => {
  //   try {
  //     if (status == "accepted") {
  //       setUpdateAcceptId(bookingId);
  //     } else if (status == "rejected") {
  //       setUpdateRejectId(bookingId);
  //     }

  //     const token = localStorage.getItem("token");
  //     // const response = await fetch(
  //     //   `http://localhost:5000/api/bookings/${bookingId}`,
  //     //   {
  //     //     method: "PUT",
  //     //     headers: {
  //     //       "Content-Type": "application/json",
  //     //       Authorization: `Bearer ${token}`,
  //     //     },
  //     //     body: JSON.stringify({ status }),
  //     //   }
  //     // );
  //     const res = await axios.put(
  //       `http://localhost:5000/api/booking/update/${id}`,
  //       { status: "accepted" },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (res.data?.message === "Booking updated successfully") {
  //       alert(" Appointment accepted successfully");
  //       fetchNewMeetings(); // refresh list
  //     }
  //     const data = await response.json();
  //     if (response.ok) {
  //       if (status == "accepted") {
  //         alert("Appointment accepted successfully");
  //       } else if (status == "rejected") {
  //         alert("Appointment rejected successfully");
  //       }
  //       fetchNewMeetings();
  //     } else {
  //       console.error(" Backend Error:", data);

  //       alert(` Failed: ${data.error || "Could not update status"}`);
  //     }
  //   }

  //   catch (err) {
  //     console.error("Error accepting appointment:", err);
  //     alert(
  //       " Failed to accept appointment. " + err.response?.data?.error || ""
  //     );
  //   } finally {
  //     setUpdatingId(null);
  //   }
  // };

  const updateStatus = async (bookingId, status) => {
    try {
      if (status == "accepted") {
        setUpdateAcceptId(bookingId);
      } else if (status == "rejected") {
        setUpdateRejectId(bookingId);
      }

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/bookings/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.message === "Booking updated successfully") {
        toast.success(` Appointment ${status} successfully`);
        fetchNewMeetings();
      } else {
        toast.warning(`⚠️ Something went wrong while updating the status.`);
      }
    } catch (err) {
      console.error("Error updating appointment:", err);
      const errorMsg = err.response?.data?.error || "Unknown error occurred";
      toast.error(`Failed to ${status} appointment: ${errorMsg}`);
    } finally {
      setUpdateAcceptId(null);
      setUpdateRejectId(null);
    }
  };

  const handleReschedule = async (id, date, time) => {
    try {
      setUpdateReschedule(id);
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/bookings/reschedule/${id}`,
        { date, time },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Appointment rescheduled successfully");
      setShowPopup(false);
      fetchNewMeetings();
    } catch (err) {
      toast.error("Failed to reschedule appointment");
    }finally {
      setUpdateReschedule(null);
    }
  };

  return (
    <>
      <SidebarLayout>
        <div className="new-meetings-page">
          <h2>New Appointments</h2>
          {meetings.length === 0 ? (
            <p>No new appointments</p>
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
                  <div className="actions">
                    <div className="send-time">{format(meeting.createdAt)}</div>
                    <button
                      onClick={() => updateStatus(meeting._id, "accepted")}
                      disabled={updateAcceptId === meeting._id}
                      className="accept-btn"
                    >
                      {updateAcceptId === meeting._id
                        ? "Accepting..."
                        : "Accept     ✅"}
                    </button>

                    <button
                      onClick={() => updateStatus(meeting._id, "rejected")}
                      disabled={updateRejectId === meeting._id}
                      className="reject-btn"
                    >
                      {updateRejectId === meeting._id
                        ? "Rejecting..."
                        : "Reject 🚫"}
                    </button>
                    <button
                      className="reschedule-btn"
                      onClick={() => {
                        setSelectedBooking(meeting);
                        setShowPopup(true);
                      }}
                    >
                      Reschedule📅
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SidebarLayout>
      {showPopup && (
        <ReschedulePopup
          booking={selectedBooking}
          onClose={() => setShowPopup(false)}
          onReschedule={handleReschedule}
        />
      )}
    </>
  );
}

export default NewMeetings;
