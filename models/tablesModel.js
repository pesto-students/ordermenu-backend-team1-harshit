const mongoose = require('mongoose');

const tablesModel = new mongoose.Schema({
  number: String,
  isBooks: Boolean,
});

module.exports = tablesModel;
