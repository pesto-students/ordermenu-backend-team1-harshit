const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  }
})

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
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  tags: [String],
  sizes: {
    type: [ProductOptionsSchema],
    required: true
  },
  extra: {
    type: [ProductOptionsSchema],
    required: true
  }
})


const TableSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  qrCode: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  }
})

const PartnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  tagline: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  logo: {
    type: String,
    default: ""
  },
  background: {
    type: String,
    default: ""
  },
  ownerId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  categories: {
    type: [CategorySchema],
    default: []
  },
  menu: {
    type: [ProductSchema],
    default: []
  },
  tables: {
    type: [TableSchema],
    default: []
  },
}, { timestamps: true });

module.exports = mongoose.model('Partner', PartnerSchema)