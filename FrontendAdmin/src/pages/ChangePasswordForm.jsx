// src/components/ChangePasswordForm.jsx
import React, { useState } from "react";
import "../styles/Form.css";
import { toast } from "react-toastify";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/settings/update-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setFormData({
          email: "",
          currentPassword: "",
          newPassword: "",
        });
      } else {
        toast.warning(data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Change Password</h3>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="input"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          placeholder="••••••••"
          className="input"
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          placeholder="••••••••"
          className="input"
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update Password</button>
    </form>
  );
};

export default ChangePasswordForm;
