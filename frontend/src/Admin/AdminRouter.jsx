import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NewMeeting from "./pages/NewMeeting";
import PendingMeeting from "./pages/PendingMeeting";
import CompletedMeeting from "./pages/CompletedMeeting";
import PrivateRoute from "./PrivateRoute";
import Messages from "./pages/Messages";
import RejectedMeeting from "./pages/RejectedMeetings";
import Setting from "./pages/Settings";
import ResheduledMeeting from "./pages/ResheduledMeeting";
import RepliedMessages from "./pages/RepliedMessages";

const AdminRouter = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="new-meeting"
          element={
            <PrivateRoute>
              <NewMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="pending-meetings"
          element={
            <PrivateRoute>
              <PendingMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="resheduled-meetings"
          element={
            <PrivateRoute>
              <ResheduledMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="completed-meetings"
          element={
            <PrivateRoute>
              <CompletedMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="rejected-meetings"
          element={
            <PrivateRoute>
              <RejectedMeeting />
            </PrivateRoute>
          }
        />
        <Route
          path="messages"
          element={
            <PrivateRoute>
              <Messages />
            </PrivateRoute>
          }
        />
        <Route
          path="settings"
          element={
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          }
        />
        <Route
          path="/replied-messages"
          element={
            <PrivateRoute>
              <RepliedMessages />
            </PrivateRoute>
          }
        />
      </Routes>
  
  );
};

export default AdminRouter;
