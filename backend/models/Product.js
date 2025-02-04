// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  category: String,
  description: String,
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }
});

module.exports = mongoose.model('Product', ProductSchema);