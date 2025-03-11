const express = require('express');
const router = express.Router();

// Route pour récupérer le panier (simplifiée pour l'instant)
router.get('/', (req, res) => {
  res.json([]);
});

// Route pour ajouter un article au panier (facultatif pour l'instant)
router.post('/add', (req, res) => {
  const item = req.body;
  // Logique pour ajouter au panier (simulée)
  res.status(201).json({ message: 'Article ajouté au panier', item });
});

module.exports = router; // Assure-toi que c'est bien un routeur qui est exporté