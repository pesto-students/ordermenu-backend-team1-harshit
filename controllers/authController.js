const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const SMS = require("../utils/sms");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = async (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // Remove password from output
  user.accessToken = token;

  await User.findByIdAndUpdate(user._id, {
    $push: { loggedInDevices: token },
  });

  res.status(statusCode).json({
    status: "success",
    token,
    accessToken: token,
    refreshToken: token,
    expiresIn: res.expires,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const isAlready = await User.findOne({
    $or: [{ email: req.body.email }, { phone: req.body.phone }],
  });
  if (isAlready) {
    return next(new AppError("Duplicate request for registration", 409));
  }

  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
  });
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { phone, OTP, hash } = req.body;

  let getUserByPhone = await User.findOne({ phone });
  // 2) Check if user exists && password is correct
  if (OTP && OTP.length === 6 && getUserByPhone) {
    const userWithOTP = await User.findOne({
      phone: req.body.phone,
    }).select("+OTP");
    // eslint-disable-next-line eqeqeq
    if (!userWithOTP || !(OTP == userWithOTP.OTP)) {
      await userWithOTP.save();
      return next(new AppError("Invalid OTP ", 404));
    }
    userWithOTP.OTP = undefined;
    await userWithOTP.save();
    createSendToken(userWithOTP, 200, req, res);
  } else {
    if (!getUserByPhone) {
      getUserByPhone = await User.create({
        firstName: undefined,
        lastName: undefined,
        phone: req.body.phone,
      });
    }
    // 1) Get user from collection
    const userInfo = await User.findById(getUserByPhone._id).select(
      "+OTP"
    );
    // 2) If so, update password
    userInfo.OTP = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    switch (getUserByPhone.phone) {
      case "7879553208": // Testing user phone number
        userInfo.OTP = 345678;
        break;
      case "9876543210": // Testing phone number
        userInfo.OTP = 345678;
        break;
      default:
        break;
    }
    await userInfo.save({ validateBeforeSave: false });
    // User.findByIdAndUpdate will NOT work as intended!

    //send OTP
    await new SMS(userInfo.phone).sendOTP("send-otp", {
      OTP: userInfo.OTP,
      hash,
    });

    res.status(200).json({
      status: "success",
      message: "OTP sent on your phone number!",
    });
  }
});

exports.current = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3) Check if user still exists
  const currentUser = await User.findOne({ _id: decoded.id });
  if (!currentUser || !currentUser.isActive) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  if (currentUser.isBlocked) {
    return next(new AppError("Your account is blocked", 403));
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  req.body.errors = {};
  next();
});


exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'partner']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
