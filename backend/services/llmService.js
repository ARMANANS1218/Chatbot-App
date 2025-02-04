// services/llmService.js
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

const processQuery = async (query) => {
  // Handle brand queries
  if (query.toLowerCase().includes('show me all products under brand')) {
    const brand = query.split('brand ')[1].replace('?', '').trim();
    const products = await Product.find({ brand });
    return products.length > 0 
      ? `Products under ${brand}: ${products.map(p => p.name).join(', ')}`
      : `No products found for brand ${brand}`;
  }

  // Handle supplier queries
  if (query.toLowerCase().includes('which suppliers provide')) {
    const category = query.split('provide ')[1].replace('?', '').trim();
    const suppliers = await Supplier.find({ productCategoriesOffered: category });
    return suppliers.length > 0
      ? `Suppliers for ${category}: ${suppliers.map(s => s.name).join(', ')}`
      : `No suppliers found for ${category}`;
  }

  return "I'm sorry, I didn't understand your query. Try something like: 'Show me Dell products' or 'Which suppliers provide laptops?'";
};

module.exports = { processQuery };