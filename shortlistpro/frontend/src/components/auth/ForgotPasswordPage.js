import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPasswordPage.css";
import Loader from "./Loader";

const ForgotPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/user/change-password",
        { oldPassword, newPassword, confirmPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess("Password changed successfully.");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="forgot-password-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="forgot-password-header">
            <h1>Change Password</h1>
            <p>Secure your account by updating your password.</p>
          </header>
          <form onSubmit={handlePasswordChange} className="animated-forgot-password-form">
            <input
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Change Password</button>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="extra-links">
              <a href="/login" className="link">Already have an account?</a>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
