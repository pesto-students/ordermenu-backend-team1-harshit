const express = require('express');

const { orderController } = require('../../controllers/')

const router = express.Router();

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.patch('/orders/:id', orderController.updateOrderById);
router.delete('/orders/:id', orderController.deleteOrderById);

module.exports = router