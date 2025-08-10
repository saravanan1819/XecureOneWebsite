import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgetPass.css";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const sendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forget-pass",
        { email }
      );
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return setMessage("Passwords do not match");
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-pass",
        {
          email,
          newPassword,
        }
      );
      setMessage(res.data.message);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    // <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
    //   <h2>Forgot Password</h2>
    //   {message && <p style={{ color: "green" }}>{message}</p>}

    //   {step === 1 && (
    //     <>
    //       <input
    //         type="email"
    //         placeholder="Enter your admin email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <button onClick={sendOtp}>Send OTP</button>
    //     </>
    //   )}

    //   {step === 2 && (
    //     <>
    //       <input
    //         type="text"
    //         placeholder="Enter OTP"
    //         value={otp}
    //         onChange={(e) => setOtp(e.target.value)}
    //       />
    //       <button onClick={verifyOtp}>Verify OTP</button>
    //     </>
    //   )}

    //   {step === 3 && (
    //     <>
    //       <input
    //         type="password"
    //         placeholder="New Password"
    //         value={newPassword}
    //         onChange={(e) => setNewPassword(e.target.value)}
    //       />
    //       <input
    //         type="password"
    //         placeholder="Confirm Password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       />
    //       <button onClick={resetPassword}>Reset Password</button>
    //     </>
    //   )}
    // </div>

    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password</h2>
      <p>Verify your email to reset your password</p>
      {message && <p className="forgot-message">{message}</p>}

      {step === 1 && (
        <>
          <label className="forgot-label">Email Address</label>
          <input
            className="forgot-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="forgot-button" onClick={sendOtp}>
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <label className="forgot-label">OTP</label>
          <input
            className="forgot-input"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="forgot-button" onClick={verifyOtp}>
            Verify OTP
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <label className="forgot-label">New Password</label>
          <input
            className="forgot-input"
            type="password"
            placeholder="••••••••"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label className="forgot-label">Confirm Password</label>
          <input
            className="forgot-input"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="forgot-button" onClick={resetPassword}>
            Reset Password
          </button>
        </>
      )}
      <div className="login-footer">
        <a href="/" className="login-link">
          Click Here To Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPassword;
