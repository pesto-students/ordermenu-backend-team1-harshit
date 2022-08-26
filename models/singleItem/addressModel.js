const mongoose = require('mongoose');

const Address = new mongoose.Schema({
title: {
  type: String
},
type: {
  type: String,
  default: 'Point',
  enum: ['Point']
},
latitude: Number,
longitude: Number,
coordinates: [Number],
landmark: {
  type: String
},
address1: {
  type: String
},
address2: {
  type: String
},
city: {
  type: String
},
state: {
  type: String
},
pinCode: {
  type: String
},
isDefault: {
  type: Boolean,
  default: false
}
});

module.exports = Address;
