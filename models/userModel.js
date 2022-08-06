const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: [true, "This phone number is already registered"],
      required: [true, "Please provide phone number"],
      minlength: [10, "Phone number should be 10 number"],
      maxlength: [10, "Phone number should be 10 number"],
    },
    profileImage: {
      type: String,
    },
    geoLocation: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "partner", "manager", "user"],
      default: "user",
    },
    tags: [String],
    appTheme: {
      type: String,
      enum: ["system", "lite", "dark"],
      default: "system",
    },
    OTP: {
      type: String,
      select: false,
    },
    OTPVerifyAttempts: {
      type: Number,
      select: false,
    },
    OTPRequests: {
      type: Number,
      select: false,
    },
    loggedInDevices: [String],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
