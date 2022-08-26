const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Partner'
    },
    name: {
      type: String,
      required: [true, 'A menu must have a name'],
      trim: true
    },
    image: {
      type: String
    },
    description: {
      type: String
    },
    tags: [String],
    size: {
      name: String,
      price: String,
    },
    extra: {
      name: String,
      price: String,
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
