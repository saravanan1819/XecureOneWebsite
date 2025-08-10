import React, { use, useEffect, useState } from "react";
import axios from "axios";
import "../styles/RepliedMessages.css";
import SidebarLayout from "../components/SidebarLayout";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RepliedMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/message/get-Replied",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data);
      fetchMessages();
    } catch (err) {
      console.error("Error fetching messages:", err);
      toast.warning("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SidebarLayout>
        <div className="messages-page">
          <div className="messages-header">
            {" "}
            <h2>Replied Messages</h2>
            <div className="view-replied" onClick={() => navigate("/messages")}>
              Back To Messages
            </div>
          </div>
          {loading ? (
            <p>Loading messages...</p>
          ) : messages.length === 0 ? (
            <p>No messages available.</p>
          ) : (
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg._id} className="message-card">
                  <div className="card-left">
                    <p>
                      <strong>Name:</strong> {msg.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {msg.email}
                    </p>
                    <p>
                      <strong>Location:</strong> {msg.location}
                    </p>
                    <p>
                      <strong>Company Type:</strong> {msg.companyType}
                    </p>
                  </div>
                  <div className="card-right">
                    {" "}
                    <p>
                      <strong>Message:</strong> {msg.message}
                    </p>
                  </div>
                  <div className="message-status">Replied ✅</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarLayout>
    </>
  );
};

export default RepliedMessages;
