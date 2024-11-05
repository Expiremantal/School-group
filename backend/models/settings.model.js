// models/settings.model.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    theme: { type: String, default: 'light' },
    fontSize: { type: Number, default: 16 },
    notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
    },
    privacy: {
        searchEngineIndexing: { type: Boolean, default: true },
        shareDataWithThirdParty: { type: Boolean, default: false },
        showOnlineStatus: { type: Boolean, default: true },
    },
    security: {
        twoFactorAuthEnabled: { type: Boolean, default: false },
        passwordChangeDate: { type: Date },
    },
    subscription: {
        currentPlan: { type: String, default: 'Free' },
        autoRenewalEnabled: { type: Boolean, default: true },
    }
});

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;