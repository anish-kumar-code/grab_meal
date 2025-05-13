
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    mobileNo: {
        type: String,
        required: [true, 'Mobile number is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true
    },
    profileImage: {
        type: String,
        default: ''
    },
    userType: {
        type: String,
        enum: ['veg', 'nonveg'],
        default: 'veg'
    },
    status: {
        type: Boolean,
        default: true
    },
    otp: {
        code: String,
        expiresAt: Date
    },
    lastLogin: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    deviceInfo: {
        deviceId: String,
        deviceModel: String,
        osVersion: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;