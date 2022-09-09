const httpStatus = require('http-status')
const { catchAsync } = require('../utils');
const { userService } = require('../services')

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body.user);
  res.send(user)
})

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.send(user)
});

const getCurrentUserDetails = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user);
  res.send(user)
});

const updateUserById = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  res.send(user)
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users)
});

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  getAllUsers,
  getCurrentUserDetails
}