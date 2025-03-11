const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  date: String,
  activities: [{ name: String, link: String }],
  mainLink: String,
});

module.exports = mongoose.model('Event', eventSchema);