const CoupDeCoeur = require('../models/CoupDeCoeur');

exports.getItems = async (req, res) => {
  try {
    const { category, highlighted } = req.query;
    const query = {};
    if (category) query.category = category;
    if (highlighted === 'true') query.highlighted = true;
    const items = await CoupDeCoeur.find(query).sort({ updatedAt: -1 }); // Tri par date de mise à jour
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await CoupDeCoeur.findById(id);
    if (!item) return res.status(404).json({ message: 'Coup de cœur non trouvé' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};