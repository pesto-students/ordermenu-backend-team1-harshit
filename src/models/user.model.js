const mongoose = require('mongoose');
const constant = require('../config/constants');

const OtpSchema = new mongoose.Schema({
    code: {
        type: Number,
    },
    expireAt: {
        type: Date,
        default: +new Date() + 30000
    },
    isUsed: {
        type: Boolean,
        default: false
    }
})


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    otp: {
        type: OtpSchema,
        select: false,
    },
    role: {
        type: String,
        enum: Object.keys(constant.userTypes),
        default: constant.userTypes.USER
    },
    orders: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);