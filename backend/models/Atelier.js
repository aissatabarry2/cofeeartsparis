const mongoose = require('mongoose');

const atelierSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  date:        { type: Date, required: true },
  places:      { type: Number, required: true },
  placesLeft:  { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Atelier', atelierSchema);