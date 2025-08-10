import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Messages.css";
import SidebarLayout from "../components/SidebarLayout";
import { toast } from "react-toastify";
import { format } from "timeago.js";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/message/get-new", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
      fetchMessages();
    } catch (err) {
      console.error("Error fetching messages:", err);
      toast.warning("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  // const updateMessageStatus = async (id,replyText) => {
  //   // if (!replyText.trim()) {
  //   //   toast.warning("Reply message cannot be empty.");
  //   //   return;
  //   // }
  //   try {
  //     const token = localStorage.getItem("token");
  //     await axios.post(
  //       `http://localhost:5000/api/message/reply/${id}`,
  //       {
  //         email: selectedMessage.email,
  //         name: selectedMessage.name,
  //         reply: replyText,
  //         status: "Replied",
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     toast.success("Reply sent successfully.");
  //     setShowReplyPopup(false);
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Failed to send reply.");
  //   }
  // };

  return (
    <>
      <SidebarLayout>
        <div className="messages-page" style={{width:"100%",padding:"15px 80px"}}>
          <div className="messages-header">
            {" "}
            <h2>New Messages</h2>
            <div
              className="view-replied"
              onClick={() => navigate("/replied-messages")}
            >
              View Replied Messages
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

                  <div>
                    <div>{format(msg.createdAt)}</div>
                    <button
                      className="reply-btn"
                      onClick={() => {
                        setSelectedMessage(msg);
                        setReplyText("");
                        setShowReplyPopup(true);
                      }}
                    >
                      Reply To {msg.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </SidebarLayout>
      {showReplyPopup && (
        <div className="reply-popup-overlay">
          <div className="reply-popup">
            <h3>Reply to {selectedMessage.name}</h3>
            <textarea
              rows={5}
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="popup-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowReplyPopup(false)}
              >
                Cancel
              </button>
              <button
                className="send-btn"
                onClick={async () => {
                  if (!replyText.trim()) {
                    toast.warning("Reply message cannot be empty.");
                    return;
                  }
                  try {
                    const token = localStorage.getItem("token");
                    await axios.post(
                      `http://localhost:5000/api/message/reply/${selectedMessage._id}`,
                      {
                        email: selectedMessage.email,
                        name: selectedMessage.name,
                        reply: replyText,
                        status: "Replied",
                      },
                      {
                        headers: { Authorization: `Bearer ${token}` },
                      }
                    );
                    toast.success("Reply sent successfully.");
                    setShowReplyPopup(false);
                  } catch (err) {
                    console.error(err);
                    toast.error("Failed to send reply.");
                  }
                }}
              >
                Send
              </button>
              {/* <button>
                <button onClick={updateMessageStatus(selectedMessage._id, replyText)}>Send</button>
              </button> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
