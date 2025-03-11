const mongoose = require('mongoose');

const coupDeCoeurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['restaurant', 'hotel', 'agence-immo', 'artisans'] },
  image: { type: String, required: true },
});

module.exports = mongoose.model('CoupDeCoeur', coupDeCoeurSchema);