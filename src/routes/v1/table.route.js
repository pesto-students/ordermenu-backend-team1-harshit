const express = require('express');

const auth = require('../../middlewares/auth')
const { tableController } = require('../../controllers/')

const router = express.Router();

router.post('/tables', auth('OWNER'), tableController.createTable);
router.get('/tables', auth('OWNER'), tableController.getAllTables);
router.get('/tables/:id', auth('OWNER'), tableController.getTableById);
router.get('/tables/availability/:id', auth('OWNER'), tableController.getAvailableTable);
router.patch('/tables/:id', auth('OWNER'), tableController.updateTableById);
router.delete('/tables/:id', auth('OWNER'), tableController.deleteTableById);

module.exports = router