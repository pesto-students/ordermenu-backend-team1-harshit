const { catchAsync } = require('../utils');
const { authService, tokenService } = require('../services/')


const signin = catchAsync(async (req, res) => {
  const user = await authService.signin(req.body.phone);
  res.send(user);
});

const signinAdmin = catchAsync(async (req, res) => {
  const user = await authService.signinAdmin(req.body.phone);
  res.send(user);
});

const signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body);
  res.send(user);
});

const verifyOtp = catchAsync(async (req, res) => {
  const { access, refresh } = await authService.verifyOtp(req.body)
  res.cookie('accessToken', access.token)
  res.cookie('refreshToken', refresh.token)
  res.send({ access, refresh })
});

module.exports = {
  signin,
  signup,
  verifyOtp,
  signinAdmin
}