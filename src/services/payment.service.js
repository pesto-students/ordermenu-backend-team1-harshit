const httpStatus = require('http-status');
const Razorpay = require('razorpay');
const { randomUUID } = require('crypto');

const { razorpay } = require('../config/config')
const { ApiError, generateSlug } = require('../utils/');

var instance = new Razorpay({ key_id: razorpay.keyId, key_secret: razorpay.keySecret })



const createRazorpayOrder = async (amount) => {
  const order = await instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: randomUUID(),
  })

  console.log("ORDER ::::: ", order)

  return order
};

module.exports = {
  createRazorpayOrder
}