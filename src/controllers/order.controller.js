const pick = require('../utils/pick');
const { catchAsync } = require('../utils');
const { orderService } = require('../services/')

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req.user._id, req.body)
  res.send(order);
});

const orderCheckout = catchAsync(async (req, res) => {
  const order = await orderService.orderCheckout(req.user._id, req.body)
  res.send(order);
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id)
  res.send(order);
});

const getAllOrdersOfPartner = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  filter.partnerId = req.params.id
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const orders = await orderService.getAllOrdersOfPartner(filter, options)
  res.send(orders);
});

const getOrderStats = catchAsync(async (req, res) => {
  const orderStats = await orderService.getOrderStats(req.params.id)
  res.send(orderStats);
});

const getAllOrdersOfUser = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status']);
  filter.userId = req.user
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const orders = await orderService.getAllOrdersOfUser(filter, options)
  res.send(orders);
});

const updateOrderStatusById = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderStatusById(req.params.id, req.params.status)
  res.send(order);
});

const subscribeOrders = catchAsync(async (req, res) => {
  orderService.subscribeOrders(req, res)
});

module.exports = {
  createOrder,
  getOrderById,
  getAllOrdersOfPartner,
  getAllOrdersOfUser,
  updateOrderStatusById,
  getOrderStats,
  orderCheckout,
  subscribeOrders
}