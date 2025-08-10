import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

import axios from "axios";
import SidebarLayout from "../components/SidebarLayout";
import StatCard from "../components/StateCard";
import { format } from "timeago.js";

const Dashboard = () => {
  // const [forecastData, setForecastData] = useState([]);
  const [newMeetings, setNewMeetings] = useState([]);
  const [pendingMeetings, setPendingMeetings] = useState([]);

  const [stats, setStats] = useState({
    pending: 0,
    new: 0,
    rejected: 0,
    completed: 0,
    total: 0,
  });
  useEffect(() => {
    fetchStats();
    // fetchForecast();
    fetchMeetings();
  });

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStats(res.data);
    } catch (error) {
      console.error("Failed to load stats", error);
    }
  };

  // const fetchForecast = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.get(
  //       "http://localhost:5000/api/dashboard/forecast",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setForecastData(res.data);
  //   } catch (error) {
  //     console.error("Failed to fetch forecast data", error);
  //   }
  // };

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token");
      const newRes = await axios.get(
        "http://localhost:5000/api/dashboard/dash-new",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const pendingRes = await axios.get(
        "http://localhost:5000/api/dashboard/dash-pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMeetings(newRes.data);
      setPendingMeetings(pendingRes.data);
    } catch (err) {
      console.error("Failed to fetch meetings", err);
    }
  };

 
  return (
    <>
      <SidebarLayout>
        <div className="dashboard-container">
          <h2 className="welcome-message">Welcome, Admin!</h2>

          <div className="card-section">
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <StatCard
                title="Total Appointments"
                value={stats.total}
                icon="📅"
                change={10}
                changeType="increase"
              />
              <StatCard
                title="New Appointments"
                value={stats.new}
                icon="🆕"
                change={5}
                changeType="increase"
              />
              <StatCard
                title="Rescheduled Appointments"
                value={stats.rescheduled}
                icon="🔄"
              />
            </div>
            <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
              <StatCard
                title="Completed Appointments"
                value={stats.completed}
                icon="✅"
                change={8}
                changeType="increase"
              />
              <StatCard
                title="Pending Appointments"
                value={stats.pending}
                icon="⏳"
                change={-3}
                changeType="decrease"
              />
              <StatCard
                title="Rejected Appointments"
                value={stats.rejected}
                icon="❌"
                change={-3}
                changeType="decrease"
              />
            </div>
          </div>

          <div className="meeting-lists">
            <div className="meeting-section new-meetings">
              <h2>New Meetings</h2>
              <ul>
                <ul>
                  {newMeetings.map((meeting) => (
                    <li key={meeting._id}>
                      <strong>{meeting.name} </strong>{" "}
                      {format(meeting.createdAt)}
                      <p>For {meeting.purpose}</p>
                    </li>
                  ))}
                </ul>
              </ul>
              <a href="new-meeting" className="view-all">
                View All New Meetings
              </a>
            </div>

            <div className="meeting-section pending-meetings">
              <h2>Pending Meetings</h2>
              <ul>
                <ul>
                  {pendingMeetings.map((meeting) => (
                    <li key={meeting._id}>
                      <strong>{meeting.name}</strong>{" "}
                      {format(meeting.createdAt)}
                      <p>{meeting.purpose}</p>
                    </li>
                  ))}
                </ul>
              </ul>
              <a href="pending-meetings" className="view-all">
                View All Pending Meetings
              </a>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </>
  );
};

export default Dashboard;

{
  /* <div className="graph-section">
          <h3>Day-wise Meeting Forecast</h3>
          <div className="graph-placeholder">
            <div className="graph-chart">
              <ResponsiveContainer>
                <LineChart
                  data={forecastData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div> */
}
