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

const MenuItemOptions = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
})

const MenuItemSchema = new mongoose.Schema({
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
  size: {
    type: [MenuItemOptions],
    required: true
  },
  extra: {
    type: [MenuItemOptions],
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
    required: true,
  }
})

const RestaurantSchema = new mongoose.Schema({
  name: {
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
    type: [MenuItemSchema]
  },
  tables: {
    type: [TableSchema]
  },
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)

module.export = Restaurant;