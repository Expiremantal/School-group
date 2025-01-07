import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js'; // Assuming you have a User model defined
import dotenv from 'dotenv';

dotenv.config();

// JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const TWO_WEEKS_IN_SECONDS = 14 * 24 * 60 * 60; // Two weeks in seconds

// Controller to register a new user
export const registerUser = async (req, res) => {
  const { username, firstName, lastName, email, password, role } = req.body;

  if (!username || !firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: newUser,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ success: false, message: 'Server error, please try again.' });
  }
};

// Controller to login a user
export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Email, password, and role are required.' });
  }

  if (role !== 'recruiter' && role !== 'applicant') {
    return res.status(400).json({ success: false, message: 'Invalid role. Only "recruiter" or "applicant" are allowed.' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.role !== role) {
      return res.status(403).json({ success: false, message: 'Role mismatch. Access denied.' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: TWO_WEEKS_IN_SECONDS }
    );
    console.log('Generated Token Payload:', { userId: user._id, role: user.role });
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({ success: false, message: 'Server error, please try again.' });
  }
};

// Controller to fetch user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile data retrieved successfully.',
      user: {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return res.status(500).json({ success: false, message: 'Error fetching profile.' });
  }
};

// Controller to update user profile
export const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, mobile, address, city, country, notifications } = req.body;
  
  // Validate required fields
  if (!firstName || !lastName || !email || !mobile) {
    return res.status(400).json({ success: false, message: 'Please provide firstName, lastName, email, and mobile.' });
  }

  try {
    // Find the user by ID (using the userId from the request)
    const userId = requ.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.address = address || user.address;
    user.city = city || user.city;
    user.country = country || user.country;
    user.notifications = notifications || user.notifications;

    // Save updated user details
    await user.save();

    return res.status(200).json({ success: true, message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ success: false, message: 'Error updating profile.' });
  }
};

// Get user settings
export const getUserSettings = async (req, res) => {
  try {
      const userId = req.userId;

      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          notifications: user.notifications,
      });
  } catch (error) {
      console.error('Error fetching settings:', error);
      return res.status(500).json({ message: 'Error fetching settings' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};


 
export const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // For example, this could update the user's role or any status

  try {
    const user = await User.findByIdAndUpdate(id, { role: status }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User status updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user status' });
  }
};
// Controller to change user password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'New passwords do not match.' });
  }

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect old password.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ success: false, message: 'Error changing password.' });
  }
};
