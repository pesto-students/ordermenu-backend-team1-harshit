const mongoose = require('mongoose');
const constant = require('../config/constants');

const UserSchema = new mongoose.Schema({
    name: {
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
        type: Number
    },
    role: {
        type: String,
        enum: Object.keys(constant.userTypes),
        default: constant.userTypes.USER
    },
    orders: {
        type: [mongoose.SchemaTypes.ObjectId],
        default: undefined
    }
});

const User = mongoose.model('User', UserSchema);

module.export = User;