import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import CSS for styling

const Login = ({ onLogin }) => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/login`, {
                email: input.email,
                password: input.password
            });
    
            console.log("API Response:", res.data); // Log the full response
    
            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                console.log("Token stored:", res.data.token);
                onLogin(res.data.user);
                navigate("/dashboard");
            } else {
                alert(res.data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error);
            alert(error.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="login-container">
            <form onSubmit={submitHandler} className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={input.email} 
                        onChange={changeEventHandler} 
                        required 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={input.password} 
                        onChange={changeEventHandler} 
                        required 
                        className="form-input"
                    />
                </div>
                <button type="submit" disabled={loading} className="submit-button">
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
                <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
            </form>
        </div>
    );
};

export default Login;
