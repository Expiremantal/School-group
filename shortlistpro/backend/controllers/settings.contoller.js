// controllers/settings.controller.js
import bcrypt from 'bcryptjs';
import User from '../models/user.models.js';
import Settings from '../models/settings.model.js'; // Assuming a settings schema is defined

// Get user settings
export const getUserSettings = async (req, res) => {
    try {
        const userId = req.userId; // Ensure you have the userId from the request
  
        const user = await User.findById(userId);
  
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
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

// Update user settings
export const updateUserSettings = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { theme, fontSize, security } = req.body;

    const updatedSettings = await Settings.findOneAndUpdate(
      { userId },
      { $set: { theme, fontSize, security } },
      { new: true }
    );

    if (!updatedSettings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    res.status(200).json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change user password
export const changePassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Incorrect current password' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

