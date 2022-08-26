const mongoose = require('mongoose');
const Address = require('./singleItem/addressModel');

const orderSchema = new mongoose.Schema(
  {
    orderUID: String,
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A order must have a userId'],
      ref: 'User'
    },
    partnerId: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'A order must have a partnerId'],
      ref: 'Partner'
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product'
        },
        quantity: Number,
        variant: String,
        amount: Number,
        noteByCustomer: String
      }
    ],
    itemsTotal: Number,
    itemsTotalMrpValue: {
      type: Number,
      default: 0
    },
    totalSavedAmount: {
      type: Number,
      default: 0
    },
    totalAmount: Number,
    isPaymentReceived: { type: Boolean, default: false },
    payment: {
      isPaid: { type: Boolean, default: false },
      paymentMethod: { type: String, default: 'CASH' },
      paymentStatus: { type: String, default: 'unpaid' },
      transactionId: String,
      transactionAt: Date
    },
    status: { type: String, default: 'placed' },
    statusMessage: { type: String, default: 'placed' },
    deliverySteps: {
      placed: {
        date: Date,
        isChecked: { type: Boolean, default: true }
      },
      confirmed: { date: Date, isChecked: { type: Boolean, default: false } },
      prepared: { date: Date, isChecked: { type: Boolean, default: false } },
      picked: { date: Date, isChecked: { type: Boolean, default: false } },
      delivered: { date: Date, isChecked: { type: Boolean, default: false } },
      cancelled: {
        date: Date,
        isChecked: { type: Boolean, default: false },
        reasonNote: String,
        cancelledBy: String
      },
      returned: {
        date: Date,
        isChecked: { type: Boolean, default: false },
        reasonNote: String
      }
    },
    verificationCode: Number,
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
