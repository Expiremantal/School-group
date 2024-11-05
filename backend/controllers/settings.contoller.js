// controllers/settings.controller.js
import Settings from '../models/settings.model.js';

// Fetch user settings by userId
export const getUserSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({ userId: req.params.userId });
        if (!settings) return res.status(404).json({ message: 'Settings not found' });
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user settings by userId
export const updateUserSettings = async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );
        if (!updatedSettings) return res.status(404).json({ message: 'Settings not found' });
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};