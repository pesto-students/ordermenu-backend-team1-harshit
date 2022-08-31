const express = require('express');

const { authController } = require('../../controllers/')

const router = express.Router();

router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOtp);

module.exports = router