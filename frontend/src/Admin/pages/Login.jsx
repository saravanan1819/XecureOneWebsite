import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", res.data.token);
      toast.success("Login Success");
      navigate("dashboard");
    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "Login failed");
    }
  };

  //   const handleLogin = async (email, password) => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/auth/login", {
  //       email,
  //       password,
  //     });

  //     localStorage.setItem("token", response.data.token);
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //     alert("Invalid credentials");
  //   }
  // };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your admin account</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
