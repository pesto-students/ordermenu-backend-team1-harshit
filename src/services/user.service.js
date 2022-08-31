const httpStatus = require('http-status')

const { User } = require('../models/')
const { ApiError } = require('../utils/')
const otpService = require('./otp.service')

const createUser = async (userBody) => {
  const existingUser = await User.findOne({ $or: [{ phone: userBody.phone }, { email: userBody.email }] });
  if (existingUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email or Phone number already taken');
  }

  const otp = await otpService.generateOTP();

  return User.create({ ...userBody, otp })
}

const getUserByPhone = async (phone) => {
  const user = User.findOne({ phone })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user
};


const getUserById = async (userId) => {
  const user = User.findOne({ _id: userId })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  return user
};

const getAllUsers = async () => {
  return User.find()
};

const updateUserById = async (userId, updateBody) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = User.findOne({ _id: userId })

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  getUserByPhone,
  getUserById,
  updateUserById,
  getAllUsers,
  deleteUserById
}