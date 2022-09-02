const httpStatus = require('http-status')
const { Order } = require('../models/')
const { ApiError } = require('../utils/')
const { orderStatusOptions } = require('../config/constants')
const partnerService = require('./partner.service')
const userService = require('./user.service')

const createOrder = async (userId, orderDetails) => {
  if (!orderDetails.products.length > 0)
    throw new ApiError(httpStatus.BAD_REQUEST, "Please add product to a make order.")

  const user = await userService.getUserById(userId);
  const partner = await partnerService.getPartnerById(orderDetails.partnerId)

  const table = partner.tables.find((t) => t._id == orderDetails.tableId)
  if (!table)
    throw new ApiError(httpStatus.NOT_FOUND, "Table not found!")

  let totalBillAmount = 0;

  const products = orderDetails?.products?.map(product => {
    const productInfo = getProductInfo(product, partner.menu)
    totalBillAmount = +productInfo.price + (+productInfo.size.price || 0) + (+productInfo.extra.price || 0)
    return productInfo
  })


  const order = {
    userId: user._id,
    partnerId: partner._id,
    user: {
      name: user.name,
      phone: user.phone,
      email: user.email
    },
    partner: {
      name: partner.name,
      address: partner.address,
      logo: partner.logo
    },
    tableNumber: table.number,
    totalBillAmount,
    products
  }

  return Order.create(order);
}

const getProductInfo = (product, products) => {
  const productInfo = products.find(p => p._id == product.id);

  return {
    id: productInfo._id,
    name: productInfo.name,
    price: productInfo.price,
    size: productInfo.sizes.map(s => s._id == product.size)[0] || { name: "Regular", price: 0 },
    extra: productInfo.extra.map(e => e._id == product.extra)[0] || { name: "Regular", price: 0 },
    quantity: product.quantity
  }
}

const getOrderById = async (orderId) => {
  const order = Order.findOne({ _id: orderId })
  if (!order)
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found!")
  return order
}

const getAllOrdersOfPartner = async (partnerId) => {
  const orders = Order.find({ partnerId })
  return orders
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

const deleteOrderById = async (req, res) => {

}

module.exports = {
  createOrder,
  getOrderById,
  getAllOrdersOfPartner,
  getAllOrdersOfUser,
  updateOrderStatusById,
  deleteOrderById
}