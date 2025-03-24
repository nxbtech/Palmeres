const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL de l'image locale
  date: { type: Date, required: true },
  activities: [{ type: String }],
  mainLink: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);