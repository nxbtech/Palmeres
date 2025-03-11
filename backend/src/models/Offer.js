const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  image: String,
  price: Number,
  category: String,
  link: String,
  activities: [{ name: String, link: String }],
  mainLink: String,
});

module.exports = mongoose.model('Offer', offerSchema);