const mongoose = require('mongoose');
const constant = require('../config/constants');

const ItemSchema = new mongoose.Schema({
    itemId: mongoose.SchemaTypes.ObjectId,
    quantity: Number,
})

const OrderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: Object.keys(constant.orderStatusOptions),
        default: constant.orderStatusOptions.PENDING,
    },
    restaurantId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    items: [ItemSchema]
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema)

module.export = Order;