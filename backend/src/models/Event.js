// backend/src/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  activities: [{ type: String }], // Optionnel
  mainLink: { type: String }, // Optionnel
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);