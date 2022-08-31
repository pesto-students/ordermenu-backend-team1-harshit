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
  },
  slug: {
    type: String,
    unique: true,
  },
  tagline: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  logo: {
    type: String,
  },
  background: {
    type: String,
  },
  ownerId: {
    type: mongoose.SchemaTypes.ObjectId
  },
  categories: {
    type: [CategorySchema]
  },
  menu: {
    type: [ProductSchema]
  },
  tables: {
    type: [TableSchema]
  },
}, { timestamps: true });

module.exports = mongoose.model('Partner', PartnerSchema)