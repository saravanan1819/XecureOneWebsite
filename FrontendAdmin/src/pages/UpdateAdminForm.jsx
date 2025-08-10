// src/components/UpdateAdminForm.jsx
import React, { useState } from "react";
import "../styles/Form.css";
import { toast } from "react-toastify";

const UpdateAdminForm = () => {
  const [formData, setFormData] = useState({
    currentEmail: "",
    newEmail: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/api/settings/update-admin",
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
          currentEmail: "",
          newEmail: "",
          newPassword: "",
          confirmPassword: "",
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
      <h3>Update Admin Credentials</h3>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Current Email Address
        </label>
        <input
          type="email"
          name="currentEmail"
          placeholder="you@example.com"
          className="input"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          New Email Address
        </label>
        <input
          type="email"
          name="newEmail"
          placeholder="you@example.com"
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

      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          className="input"
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Update Admin</button>
    </form>
  );
};

export default UpdateAdminForm;
