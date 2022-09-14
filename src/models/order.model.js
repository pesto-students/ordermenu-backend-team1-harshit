const mongoose = require('mongoose');
const constant = require('../config/constants');
const { paginate } = require('./plugins');

const ProductOptionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
})

const ProductSchema = new mongoose.Schema({
    id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    quantity: {
        type: Number
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    size: {
        type: ProductOptionsSchema
    },
    extra: {
        type: ProductOptionsSchema
    }
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    }
})

const PartnerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    logo: {
        type: String
    }
})


const OrderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: Object.keys(constant.orderStatusOptions),
        default: constant.orderStatusOptions.PENDING,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    partnerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    partner: {
        type: PartnerSchema,
        required: true
    },
    totalBillAmount: { type: Number },
    user: {
        type: UserSchema,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    },
    products: [ProductSchema],
    completedAt: { type: Date },
    paymentInfo: { type: mongoose.SchemaTypes.Mixed }
}, { timestamps: true });

OrderSchema.plugin(paginate)

module.exports = mongoose.model('Order', OrderSchema)