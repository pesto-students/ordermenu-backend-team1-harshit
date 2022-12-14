const express = require('express');

const auth = require('../../middlewares/auth')
const { uploadController } = require('../../controllers/')

const router = express.Router();

router.post('/upload', auth('upload'), uploadController.uploadFile);

module.exports = router