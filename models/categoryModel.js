const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    partnerId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Partner'
    },
    name: {
      type: String,
      required: [true, 'A category must have a name'],
      trim: true
    },
    image: {
      type: String
    },
    description: {
      type: String
    }
  },
  {
    toObject: { virtuals: true },
    timestamps: true
  }
);

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
