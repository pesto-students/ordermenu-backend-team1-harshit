const otpGenerator = require('otp-generator');
const { otp: { OTP_LENGTH, OTP_CONFIG } } = require('../config/constants');

module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return { code: OTP, expireAt: +new Date() + 5 * 60 * 1000 };
};