const express = require('express');

const { authController } = require('../../controllers/')

const router = express.Router();

router.post('/signin', authController.signin);
router.post('/signin/admin', authController.signinAdmin);
router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOtp);
router.post('/refresh-token', authController.refreshTokens);

module.exports = router