const httpStatus = require('http-status')

const { User } = require('../models/')
const { ApiError } = require('../utils/')
const tokenService = require('./token.service')
const otpService = require('./otp.service')
const userService = require('./user.service')

const signin = async (phone) => {
  const user = await User.findOne({ phone });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  user.otp = await otpService.generateOTP();

  console.log("otp -> ", user.otp);
  user.save()
  return { _id: user._id, phone: user.phone }
};

const signup = async (userInfo) => {
  const user = await userService.createUser(userInfo);
  return {
    userId: user._id,
    phone: user.phone
  }
}

const verifyOtp = async ({ userId, otp }) => {
  const user = await User.findOne({ _id: userId }).select('otp');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const { code, expireAt, isUsed } = user?.otp;
  if (isUsed)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Otp is already used.")

  if (+expireAt < +new Date())
    throw new ApiError(httpStatus.UNAUTHORIZED, "Otp is expred.")

  if (code === otp) {
    user.otp.isUsed = true;
    user.save();
    return tokenService.generateAuthTokens(user);
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, "OTP is invalid. Plesae enter correct otp.")
};


module.exports = {
  signin,
  signup,
  verifyOtp
}