const express = require('express');

const auth = require('../../middlewares/auth')
const { orderController } = require('../../controllers/')

const router = express.Router();

router.post('/orders', auth("createOrder"), orderController.createOrder);
router.get('/orders', auth("orders"), orderController.getAllOrdersOfUser);
router.post('/orders/checkout', auth("createOrder"), orderController.orderCheckout);
router.get('/orders/partners/:id', auth("orders"), orderController.getAllOrdersOfPartner);
router.get('/orders/stats/:id', auth("orders"), orderController.getOrderStats);
router.get('/orders/:id', auth("orders"), orderController.getOrderById);
router.patch('/orders/:id/:status', auth("orders"), orderController.updateOrderStatusById);

module.exports = router