const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  content:     { type: String, required: true },
  author:      { type: String, default: "Admin" },
  image:       { type: String },
  publishedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
