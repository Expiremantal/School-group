import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountSettings = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        notifications: true,
    });

    const [message, setMessage] = useState('');

    // Get user settings from backend (authenticated user)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/user/settings', {
                    withCredentials: true, // Include credentials (cookies or JWT)
                });

                // Set form data with fetched user data
                setFormData({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    notifications: response.data.notifications.email,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                'http://localhost:8000/api/v1/user/settings', // Backend route for updating user settings
                formData,
                { withCredentials: true } // Send credentials for auth
            );

            setMessage('Settings updated successfully!');
        } catch (error) {
            console.error('Error updating settings:', error);
            setMessage('Failed to update settings.');
        }
    };

    return (
        <div className="account-settings">
            <h2>Account Settings</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={formData.notifications}
                            onChange={handleChange}
                        />
                        Receive Notifications
                    </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
            <div className="account-deletion">
                <h3>Account Deletion</h3>
                <p>If you wish to delete your account, please contact support.</p>
            </div>
        </div>
    );
};

export default AccountSettings;