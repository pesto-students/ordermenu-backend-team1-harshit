const { otp: { OTP_LENGTH } } = require('../config/constants');


const getOtp = () => {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < OTP_LENGTH; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}


module.exports.generateOTP = () => {
  const OTP = 123456
  // Number(getOtp());
  return { code: OTP, expireAt: +new Date() + 5 * 60 * 1000 };
};