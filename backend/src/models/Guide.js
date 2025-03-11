const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  link: String,
  category: { type: String, enum: ['expat', 'tourisme'] },
});

module.exports = mongoose.model('Guide', guideSchema);