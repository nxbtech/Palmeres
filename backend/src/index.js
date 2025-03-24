const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images'))); // Doit être avant les routes et le 404

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/forum', require('./routes/forumRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/guides', require('./routes/guideRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/coup-de-coeur', require('./routes/coupDeCoeurRoutes'));
app.use('/api/offers', require('./routes/offerRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Route de test
app.get('/api/test', (req, res) => res.json({ message: 'Serveur fonctionne' }));

// Middleware 404 - Doit être en dernier
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée', path: req.path });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));