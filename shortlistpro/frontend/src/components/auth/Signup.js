import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        file: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" }
            });
            if (res.data.success) {
                navigate("/login");
                alert("Signup successful!");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            backgroundColor: '#d3d3d3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9fafb'
        },
        form: {
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#d3d3d3'
        },
        inputContainer: {
            marginBottom: '1rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.9rem'
        },
        input: {
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc'
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: 'rgb(0, 65, 194)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        link: {
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'block',
            textAlign: 'center',
            marginTop: '1rem'
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={submitHandler} style={styles.form}>
                <h1 style={styles.header}>Sign Up</h1>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Full Name</label>
                    <input
                        type="text"
                        name="fullname"
                        value={input.fullname}
                        onChange={changeEventHandler}
                        placeholder="Enter your full name"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="Enter your email"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={input.phoneNumber}
                        onChange={changeEventHandler}
                        placeholder="Enter your phone number"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="Enter your password"
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Profile Picture</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={changeFileHandler}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
                <Link to="/login" style={styles.link}>Already have an account? Login</Link>
            </form>
        </div>
    );
};

export default Signup;
