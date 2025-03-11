const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};