const mongoose = require('mongoose');

const coupDeCoeurSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['restaurant', 'hotel', 'agence-immo', 'artisans', 'commerces'] 
  },
  image: { type: String, required: true }, // Image principale
  additionalImages: [{ type: String }], // Photos supplémentaires
  rating: { type: Number, min: 0, max: 5, default: 4 },
  highlighted: { type: Boolean, default: false }, // Pour coups de cœur du mois
  address: { type: String },
  website: { type: String },
  michelinStars: { type: Number, min: 0, max: 3, default: 0 }, // 0 si non étoilé
  distance: { type: String }, // Distance au centre-ville, ex. "0.5 km"
  highlights: [{ type: String }] // Liste d'atouts, ex. ["Vue panoramique", "Proche plage"]
}, { timestamps: true });

module.exports = mongoose.model('CoupDeCoeur', coupDeCoeurSchema);