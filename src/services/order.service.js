const httpStatus = require('http-status')
const { Order } = require('../models/')
const { ApiError } = require('../utils/')
const { orderStatusOptions } = require('../config/constants')
const partnerService = require('./partner.service')
const userService = require('./user.service')
const { createRazorpayOrder } = require('./payment.service')

const createOrder = async (userId, orderDetails) => {
  if (!orderDetails.products.length > 0)
    throw new ApiError(httpStatus.BAD_REQUEST, "Please add product to a make order.")

  if (!orderDetails.paymentInfo)
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment is required to make an order.")

  const user = await userService.getUserById(userId);
  const partner = await partnerService.getPartnerById(orderDetails.partnerId)

  const tableIndex = partner.tables.findIndex((t) => t._id == orderDetails.tableId)
  if (tableIndex < 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Table not found!")

  let totalBillAmount = 0;

  const products = orderDetails?.products?.map(product => {
    const productInfo = getProductInfo(product, partner.menu)
    totalBillAmount = +productInfo.price + (+productInfo.size.price || 0) + (+productInfo.extra.price || 0)
    return productInfo
  })

  partner.tables[tableIndex].isBooked = true;
  partner.save()

  const order = {
    userId: user._id,
    partnerId: partner._id,
    user: {
      name: user.firstName + " " + user.lastName,
      phone: user.phone,
      email: user.email
    },
    partner: {
      name: partner.name,
      address: partner.address,
      logo: partner.logo
    },
    paymentInfo: orderDetails?.paymentInfo,
    tableNumber: partner.tables[tableIndex].number,
    totalBillAmount,
    products
  }

  const o = await createRazorpayOrder(totalBillAmount)
  console.log("============ORDER===========", o)

  return Order.create(order);
}

const orderCheckout = async (userId, orderDetails) => {
  if (!orderDetails.products.length > 0)
    throw new ApiError(httpStatus.BAD_REQUEST, "Please add product to a make order.")

  const partner = await partnerService.getPartnerById(orderDetails.partnerId)

  let totalBillAmount = 0;

  orderDetails?.products?.map(product => {
    const productInfo = getProductInfo(product, partner.menu)
    totalBillAmount = +productInfo.price + (+productInfo.size.price || 0) + (+productInfo.extra.price || 0)
    return productInfo
  })

  return await createRazorpayOrder(totalBillAmount * 100);
}

const getProductInfo = (product, products) => {
  const productInfo = products.find(p => p._id == product.id);

  return {
    id: productInfo._id,
    name: productInfo.name,
    price: productInfo.price,
    size: productInfo.sizes.find(s => s._id == product.size) || { name: "Regular", price: 0 },
    extra: productInfo.extra.find(e => e._id == product.extra) || { name: "Regular", price: 0 },
    quantity: product.quantity
  }
}

const getOrderById = async (orderId) => {
  const order = Order.findOne({ _id: orderId })
  if (!order)
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found!")
  return order
}

const getAllOrdersOfPartner = async (filter, options) => {
  const orders = Order.paginate(filter, options)
  return orders
}

const getOrderStats = async (partnerId) => {
  const orders = await Order.find({ partnerId })

  return {
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === orderStatusOptions.PENDING).length,
    acceptedOrders: orders.filter((order) => order.status === orderStatusOptions.ACCEPTED).length,
    completedOrders: orders.filter((order) => order.status === orderStatusOptions.COMPLETED).length
  }
}

const getAllOrdersOfUser = async (userId) => {
  const orders = Order.find({ userId })
  return orders
}

const updateOrderStatusById = async (orderId, status) => {
  if (!orderStatusOptions[status])
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid order status.")

  const order = await getOrderById(orderId)
  order.status = status;

  return await order.save()
}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrdersOfPartner,
  getAllOrdersOfUser,
  updateOrderStatusById,
  getOrderStats,
  orderCheckout
}