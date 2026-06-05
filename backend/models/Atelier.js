const mongoose = require('mongoose');

const atelierSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  studentPrice: Number,
  date: { type: Date, required: true },
  places: { type: Number, required: true },
  placesLeft: Number,
  level: { type: String, default: "Débutant" },
  duration: { type: String, default: "2h" },
  status: { type: String, default: "Actif" },
  category: { type: String, default: "Standard" },
  image: String,
  type: String
}, { timestamps: true });

module.exports = mongoose.model('Atelier', atelierSchema);