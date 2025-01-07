import React, { useState } from 'react';
import axios from 'axios';
import './styles/user.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    
    // Automatically populate email based on username
    if (newUsername) {
      setEmail(`${newUsername}@gmail.com`); // Change the domain as needed
    } else {
      setEmail(''); // Clear email if username is empty
    }
  };

  // Validate first name (only letters allowed)
  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]+$/.test(value) || value === '') {
      setFirstName(value);
      setError(''); // Clear any previous error
    } else {
      setError('First name can only contain letters.');
    }
  };

  // Validate last name (only letters allowed)
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z]+$/.test(value) || value === '') {
      setLastName(value);
      setError(''); // Clear any previous error
    } else {
      setError('Last name can only contain letters.');
    }
  };

  const handleRegisterUser = async () => {
    const newUser = {
      username,
      firstName,
      lastName,
      email,
      role,
      password,
    };

    try {
      // Send newUser data to the backend via a POST request
      const response = await axios.post('http://localhost:8000/api/v1/user/register', newUser);

      if (response.data.success) {
        setUsers([...users, response.data.user]); // Update state with the response from the server
        alert('User registered successfully');
        
        // Clear form fields
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setRole('');
        setPassword('');
      } else {
        alert(response.data.message); // Show the error message from the server
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user. Please try again.');
    }
  };

  const handleDeleteUser = (userId) => {
    // Make API call to delete user from the backend
    axios.delete(`/api/users/${userId}`).then(() => {
      // Filter out the user with the given ID from the users list
      setUsers(users.filter((user) => user.id !== userId));
      alert('User deleted successfully');
    }).catch((error) => {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    });
  };

  return (
    <div className="user-management">
      <h2>Profile Management</h2>
      
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange} // Use the new handler
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={handleFirstNameChange} // Validate first name
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={handleLastNameChange} // Validate last name
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        readOnly // Make the email field read-only
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>} {/* Show error message */}
      <button onClick={handleRegisterUser} disabled={!!error}>Register User</button>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
