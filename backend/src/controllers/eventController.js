// backend/src/controllers/eventController.js
const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Tri par date croissante
    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};