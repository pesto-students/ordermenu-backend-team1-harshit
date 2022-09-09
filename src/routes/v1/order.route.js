const express = require('express');

const auth = require('../../middlewares/auth')
const { orderController } = require('../../controllers/')

const router = express.Router();

router.post('/orders', auth("OWNER"), orderController.createOrder);
router.get('/orders', auth("OWNER"), orderController.getAllOrdersOfUser);
router.get('/orders/partners/:id', auth("OWNER"), orderController.getAllOrdersOfPartner);
router.get('/orders/stats/:id', auth("OWNER"), orderController.getOrderStats);
router.get('/orders/:id', auth("OWNER"), orderController.getOrderById);
router.patch('/orders/:id/:status', auth("OWNER"), orderController.updateOrderStatusById);

module.exports = router