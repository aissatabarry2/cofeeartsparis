const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ product: String, name: String, price: Number, quantity: Number }],
  total: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });
module.exports = mongoose.model('Order', schema);