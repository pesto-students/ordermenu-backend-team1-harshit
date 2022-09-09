const { catchAsync } = require('../utils');
const { orderService } = require('../services/')

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.user._id, req.body)
  res.send(order);
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id)
  res.send(order);
});

const getAllOrdersOfPartner = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrdersOfPartner(req.params.id)
  res.send(orders);
});

const getOrderStats = catchAsync(async (req, res) => {
  const orderStats = await orderService.getOrderStats(req.params.id)
  res.send(orderStats);
});

const getAllOrdersOfUser = catchAsync(async (req, res) => {
  const orders = await orderService.getAllOrdersOfUser(req.user._id)
  res.send(orders);
});

const updateOrderStatusById = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatusById(req.params.id, req.params.status)
  res.send(order);
});


module.exports = {
  createOrder,
  getOrderById,
  getAllOrdersOfPartner,
  getAllOrdersOfUser,
  updateOrderStatusById,
  getOrderStats
}