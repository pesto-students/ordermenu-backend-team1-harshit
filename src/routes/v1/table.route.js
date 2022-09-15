const express = require('express');

const auth = require('../../middlewares/auth')
const { tableController } = require('../../controllers/')

const router = express.Router();

router.post('/tables', auth('tables'), tableController.createTable);
router.get('/tables', auth('tables'), tableController.getAllTables);
router.get('/tables/:id', auth('tables'), tableController.getTableById);
router.get('/tables/availability/:id', auth('tables'), tableController.getAvailableTable);
router.patch('/tables/:id', auth('tables'), tableController.updateTableById);
router.delete('/tables/:id', auth('tables'), tableController.deleteTableById);

module.exports = router