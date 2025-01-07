import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import axios from 'axios';
import Loader from './Loader';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      try {
        // Send login data to backend
        const response = await axios.post('http://localhost:8000/api/v1/user/login', { email, password,role });

        if (response.data.success) {
          // Store the username (using the first part of the email) in localStorage
          localStorage.setItem('username', email.split('@')[0]);
          localStorage.setItem('role', response.data.user.role);
          localStorage.setItem('token', response.data.token);

          // Redirect to the main dashboard (since it's the default route)
          navigate('/');  // This will redirect to the '/' route (main dashboard)
        } else {
          setError(response.data.message); // Show error message if login fails (user not found, wrong password, etc.)
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred during login. Please try again.');
      }
      setIsLoading(false);
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="login-header">
            <h1 className="website-name-animation">ShortlistPro</h1>
            <p>Your gateway to a better career or a better team.</p>
          </header>
          <form onSubmit={handleLogin} className="animated-login-form">
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">Login</button>
            {error && <div className="error-message">{error}</div>}
            <div className="extra-links">
              <a href="/change-password" className="link">Forgot Password?</a>
              
            </div>
          </form>
          <footer className="login-footer">
            <p>&copy; 2024 ShortlistPro. All rights reserved.</p>
            <nav>
              <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
              <a href="/terms-of-service" className="footer-link">Terms of Service</a>
              <a href="/contact-us" className="footer-link">Contact Us</a>
            </nav>
          </footer>
        </>
      )}
    </div>
  );
};

export default LoginPage;
