// components/auth/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/login'); // Redirect to login page
  }, [onLogout, navigate]);

  return <div>Logging out...</div>; // Optional: You can add a loading message or spinner here
};

export default Logout;