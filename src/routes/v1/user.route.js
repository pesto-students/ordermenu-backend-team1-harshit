const express = require('express');

const { userController } = require('../../controllers/')

const auth = require('../../middlewares/auth')

const router = express.Router();

router.get('/users', auth('manageUser'), userController.getAllUsers);
router.get('/user', auth('manageUser'), userController.getCurrentUserDetails);
router.get('/users/:id', auth('manageUser'), userController.getUserById);
router.patch('/users/:id', auth('updateUser'), userController.updateUserById);

module.exports = router