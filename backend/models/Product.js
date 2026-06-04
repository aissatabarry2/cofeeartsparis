const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number
}, { timestamps: true });
module.exports = mongoose.model('Product', schema);