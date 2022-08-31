const express = require('express');

const { userController } = require('../../controllers/')

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.patch('/users/:id', userController.updateUserById);

module.exports = router