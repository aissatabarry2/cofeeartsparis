const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items:  [{ product: String, name: String, price: Number, quantity: Number }],
  total:  { type: Number, required: true },
  status: { type: String, enum: ['pending','confirmed','shipped','delivered'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);