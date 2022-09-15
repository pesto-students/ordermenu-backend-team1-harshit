const express = require('express');

const { userController } = require('../../controllers/')

const auth = require('../../middlewares/auth')

const router = express.Router();

router.get('/users', auth('OWNER'), userController.getAllUsers);
router.get('/user', auth('OWNER'), userController.getCurrentUserDetails);
router.get('/users/:id', auth('OWNER'), userController.getUserById);
router.patch('/users/:id', auth('OWNER'), auth('USER'), userController.updateUserById);

module.exports = router