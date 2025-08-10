// src/components/SidebarLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/SidebarLayout.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Xecure One </h2>
        <nav className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to ="/messages">Messages</Link>
          <Link to="/new-meeting">New Meetings</Link>
          <Link to="/pending-meetings">Pending Meetings</Link>
          <Link to="/resheduled-meetings">Resheduled Meetings</Link>
          <Link to="/completed-meetings">Completed Meetings</Link>
          <Link to="/rejected-meetings">Rejected Meetings</Link>
          <Link to="/settings">Settings</Link>
          <span className='logout-link' onClick={handleLogout}>Logout</span>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;
