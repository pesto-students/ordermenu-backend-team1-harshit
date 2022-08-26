const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
    role: {
      type: String,
      enum: ["admin", "partner", "manager", "user"],
      default: "user",
    },
    OTP: {
      type: String,
      select: false,
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
