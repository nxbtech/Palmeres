const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['tshirts', 'casquettes', 'hotels', 'villas', 'sacs', 'serviettes', 'accessoires'], required: true },
  image: String,
  description: String,
});

module.exports = mongoose.model('Product', productSchema);