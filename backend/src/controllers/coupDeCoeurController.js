const CoupDeCoeur = require('../models/CoupDeCoeur');

exports.getItems = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const items = await CoupDeCoeur.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};