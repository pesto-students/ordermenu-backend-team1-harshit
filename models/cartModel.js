const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'The cart must have a User'],
      ref: 'User'
    },
    partnerId: {
      type: mongoose.Schema.ObjectId,
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
        isValidProduct: {
          type: Boolean,
          default: true
        },
        noteByCustomer: String,
        error: String
      }
    ],
    itemsTotal: {
      type: Number,
      default: 0
    },
    itemsTotalMrpValue: {
      type: Number,
      default: 0
    },
    totalSavedAmount: {
      type: Number,
      default: 0
    },
    totalAmount: {
      type: Number,
      default: 0
    },
    gstTax: {
      type: Number,
      default: 0
    },
    isValidCart: {
      type: Boolean,
      default: true
    },
    errorMessage: String,
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

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
