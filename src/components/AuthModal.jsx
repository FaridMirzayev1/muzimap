import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./AuthModal.css";

const AuthModal = ({ onClose, type, setModalType }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const switchTab = (newType) => {
    setModalType(newType);
  };
  const btnOnc = (e) => {
    e.preventDefault();
    console.log("Sign Up button clicked");
  }

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-tabs">
          <div
            className={`tab ${type === "login" ? "active" : ""}`}
            onClick={() => switchTab("login")}>
            Log In
          </div>
          <div
            className={`tab ${type === "signup" ? "active" : ""}`}
            onClick={() => switchTab("signup")}>
            Sign Up
          </div>
        </div>

        {type === "login" ? (
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <button type="submit">Log In</button>

            <div className="modal-footer">
              Don't have an account?{" "}
              <span onClick={() => switchTab("signup")}>Sign Up</span>
            </div>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <input
              type="date"
              name="birthDate"
              required
              onChange={handleChange}
              className="birth-date-input"
            />
            <button onClick={btnOnc} type="submit">Sign Up</button>

            <div className="modal-footer">
              Already have an account?{" "}
              <span onClick={() => switchTab("login")}>Log In</span>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
