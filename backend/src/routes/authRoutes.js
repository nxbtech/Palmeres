const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Votre modèle User

// Middleware pour vérifier le token JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrait le token après "Bearer"
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé : aucun token fourni' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Stocke les données décodées du token dans req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};

// Route pour récupérer le profil de l'utilisateur
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // Récupère l'utilisateur depuis la base de données avec l'ID décodé du token
    const user = await User.findById(req.user.id).select('-password'); // Exclut le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Exemple : récupérer les commandes (à adapter selon votre modèle)
    const orders = [
      // Simulation de données si pas de modèle Order
      { itemName: 'T-Shirt Costa Brava', price: 20, date: new Date() },
    ];

    res.json({
      user: {
        email: user.email,
        username: user.username,
      },
      orders, // Remplacez par une vraie requête si vous avez un modèle Order
    });
  } catch (error) {
    console.error('Erreur dans /profile:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes existantes (exemple)
router.post('/login', async (req, res) => {
  // Votre logique de connexion ici
});

router.post('/register', async (req, res) => {
  // Votre logique d'inscription ici
});

module.exports = router;