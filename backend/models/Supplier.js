// models/Supplier.js
const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: String,
  contactInfo: String,
  productCategoriesOffered: [String]
});

module.exports = mongoose.model('Supplier', SupplierSchema);