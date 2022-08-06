const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  const doc = await User.findById(req.user._id);
  res.status(200).json(doc);
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "profileImage"
  );

  // 3) Update user document
  await User.findByIdAndUpdate(req.user._id, filteredBody);
  const updatedUser = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};
