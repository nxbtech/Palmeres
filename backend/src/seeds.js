const mongoose = require('mongoose');
const Product = require('./models/Product');
const ForumPost = require('./models/ForumPost');
const Guide = require('./models/Guide');
const Event = require('./models/Event');
const CoupDeCoeur = require('./models/CoupDeCoeur'); // Ajout du modèle
const Donation = require('./models/Donation');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Supprimer toutes les données existantes
    await Product.deleteMany();
    await ForumPost.deleteMany();
    await Guide.deleteMany();
    await Event.deleteMany();
    await CoupDeCoeur.deleteMany();
    await Donation.deleteMany();
    await User.deleteMany();

    // Insérer des utilisateurs (pour la connexion)
    const users = [
      { email: 'alice@example.com', password: await bcrypt.hash('password123', 10) },
      { email: 'bob@example.com', password: await bcrypt.hash('password456', 10) },
      { email: 'clara@example.com', password: await bcrypt.hash('password789', 10) },
    ];
    await User.insertMany(users);

    // Insérer des produits (Boutique)
    const products = [
      { name: 'T-Shirt Platja Vibes', price: 25, category: 'tshirts', image: 'https://i.postimg.cc/kg9YYbTn/f1.jpg', description: 'Un t-shirt élégant pour les amoureux de Platja d’Aro.' },
      { name: 'T-Shirt Costa Brava', price: 20, category: 'tshirts', image: 'https://i.postimg.cc/2yhT2kvb/f2.jpg', description: 'Parfait pour un look décontracté sur la Costa Brava.' },
      { name: 'T-Shirt Sunset Platja', price: 22, category: 'tshirts', image: 'https://i.postimg.cc/3x3NqW5b/f5.jpg', description: 'Un t-shirt inspiré des couchers de soleil.' },
      { name: 'Casquette Platja Sun', price: 15, category: 'casquettes', image: 'https://i.postimg.cc/VL9DtNm2/f3.jpg', description: 'Protégez-vous du soleil avec style.' },
      { name: 'Casquette Brava Style', price: 18, category: 'casquettes', image: 'https://i.postimg.cc/vZ3hPS1z/f4.jpg', description: 'Une casquette tendance pour vos aventures.' },
      { name: 'Sac Platja Tote', price: 30, category: 'sacs', image: 'https://i.postimg.cc/1Xz4YkW5/tote.jpg', description: 'Un sac tote parfait pour la plage.' },
      { name: 'Serviette Costa Brava', price: 22, category: 'serviettes', image: 'https://i.postimg.cc/8zL3NqY8/serviette.jpg', description: 'Une serviette douce pour vos journées à la plage.' },
      { name: 'Lunettes de Soleil Brava', price: 45, category: 'accessoires', image: 'https://i.postimg.cc/QxY7ZqW5/lunettes.jpg', description: 'Protégez vos yeux avec style.' },
      { name: 'Bracelet Marin', price: 12, category: 'accessoires', image: 'https://i.postimg.cc/6qW4ZqW5/bracelet.jpg', description: 'Un bracelet inspiré de la mer.' },
      { name: 'T-Shirt Platja Wave', price: 27, category: 'tshirts', image: 'https://i.postimg.cc/7hK5ZqW5/wave.jpg', description: 'Un t-shirt avec un design de vagues.' },
      { name: 'Casquette Sunset', price: 16, category: 'casquettes', image: 'https://i.postimg.cc/9Fz4YkW5/sunset.jpg', description: 'Une casquette aux couleurs du coucher de soleil.' },
    ];
    await Product.insertMany(products);

    // Insérer des posts de forum
    const forumPosts = [
      { topic: 'expat', sender: 'Marie', content: 'Quelqu’un a des conseils pour louer à Platja ?', time: new Date(), isCurrentUser: false },
      { topic: 'tourisme', sender: 'Lucie', content: 'Quelles plages recommandez-vous ?', time: new Date(), isCurrentUser: false },
      { topic: 'expat', sender: 'Paul', content: 'Quels sont les meilleurs quartiers pour vivre ?', time: new Date(), isCurrentUser: false },
      { topic: 'tourisme', sender: 'Sophie', content: 'Y a-t-il des activités pour enfants ?', time: new Date(), isCurrentUser: false },
      { topic: 'expat', sender: 'Clara', content: 'Comment trouver un emploi local ?', time: new Date(), isCurrentUser: false },
      { topic: 'tourisme', sender: 'Jean', content: 'Quels restaurants sont à ne pas manquer ?', time: new Date(), isCurrentUser: false },
      { topic: 'expat', sender: 'Thomas', content: 'Quel est le coût de la vie à Platja ?', time: new Date(), isCurrentUser: false },
      { topic: 'tourisme', sender: 'Emma', content: 'Où faire du shopping ?', time: new Date(), isCurrentUser: false },
      { topic: 'expat', sender: 'Léa', content: 'Comment s’inscrire à des cours de langue ?', time: new Date(), isCurrentUser: false },
    ];
    await ForumPost.insertMany(forumPosts);

    // Insérer des guides
    const guides = [
      { name: 'Guide Expat', image: 'https://i.pinimg.com/564x/6OkSfKKP476ZKzGJoDlXfXuWzX-vjlDRotIVMTz3lmo.jpg', link: '/assets/guides/guide-expat.pdf', category: 'expat' },
      { name: 'Guide Tourisme', image: 'https://i.pinimg.com/564x/41Pv7w9rcbn7II_gB2vwvVCQRYE5mvpca1ZbsvMujR0.jpg', link: '/assets/guides/guide-tourisme.pdf', category: 'tourisme' },
      { name: 'Guide Gastronomie', image: 'https://i.pinimg.com/564x/5a/6b/7c/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c.jpg', link: '/assets/guides/guide-gastronomie.pdf', category: 'tourisme' },
      { name: 'Guide Activités', image: 'https://i.pinimg.com/564x/7b/8c/9d/7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d.jpg', link: '/assets/guides/guide-activites.pdf', category: 'tourisme' },
      { name: 'Guide Logement', image: 'https://i.pinimg.com/564x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e.jpg', link: '/assets/guides/guide-logement.pdf', category: 'expat' },
    ];
    await Guide.insertMany(guides);

    // Insérer des événements
    const events = [
      {
        name: 'Carnaval de Platja d’Aro 2025',
        image: 'https://i.pinimg.com/564x/e7/ac/31/e7ac31fe00d29fbba88251c8e87f0f8f.jpg',
        date: '27 Fév - 5 Mars 2025',
        activities: [
          { name: 'Grande Parade (Rua)', link: '/evenements/carnaval/rua' },
          { name: 'Concours de Costumes', link: '/evenements/carnaval/concours' },
          { name: 'Animations Enfants', link: '/evenements/carnaval/animations' },
        ],
        mainLink: '/evenements/carnaval',
      },
      {
        name: 'Festa Major de Platja d’Aro 2025',
        image: 'https://i.pinimg.com/564x/8b/84/49/8b8449cf9de2e1880cd774be3157960b.jpg',
        date: '15 - 20 Août 2025',
        activities: [
          { name: 'Concerts Gratuits', link: '/evenements/festa-major/concerts' },
          { name: 'Compétitions Sportives', link: '/evenements/festa-major/sports' },
          { name: 'Feux d’Artifice', link: '/evenements/festa-major/feux' },
        ],
        mainLink: '/evenements/festa-major',
      },
      {
        name: 'Mercat Medieval 2025',
        image: 'https://i.pinimg.com/564x/5f/3e/2d/5f3e2d1a8b9c0f1e2d3c4e5f6a7b8c9.jpg',
        date: '12 - 14 Juil 2025',
        activities: [
          { name: 'Spectacles de Chevaliers', link: '/evenements/mercat-medieval/chevaliers' },
          { name: 'Ateliers Artisanaux', link: '/evenements/mercat-medieval/ateliers' },
          { name: 'Dégustations Médiévales', link: '/evenements/mercat-medieval/degustations' },
        ],
        mainLink: '/evenements/mercat-medieval',
      },
      {
        name: 'Festival de Jazz de Platja d’Aro 2025',
        image: 'https://i.pinimg.com/564x/9a/1b/4e/9a1b4e2c3d4e5f6a7b8c9d0e1f2a3b4.jpg',
        date: '3 - 7 Juil 2025',
        activities: [
          { name: 'Concerts de Jazz', link: '/evenements/jazz/concerts' },
          { name: 'Jam Sessions', link: '/evenements/jazz/sessions' },
          { name: 'Ateliers Musicaux', link: '/evenements/jazz/ateliers' },
        ],
        mainLink: '/evenements/jazz',
      },
      {
        name: 'Fira de Nadal 2025',
        image: 'https://i.pinimg.com/564x/2c/3d/4e/2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7.jpg',
        date: '6 - 22 Déc 2025',
        activities: [
          { name: 'Ateliers pour Enfants', link: '/evenements/fira-nadal/enfants' },
          { name: 'Concerts de Noël', link: '/evenements/fira-nadal/concerts' },
          { name: 'Dégustations', link: '/evenements/fira-nadal/degustations' },
        ],
        mainLink: '/evenements/fira-nadal',
      },
      {
        name: 'Triatló de Platja d’Aro 2025',
        image: 'https://i.pinimg.com/564x/7d/8e/9f/7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2.jpg',
        date: '20 Sept 2025',
        activities: [
          { name: 'Compétition Principale', link: '/evenements/triatlo/competition' },
          { name: 'Course Amateurs', link: '/evenements/triatlo/amateurs' },
          { name: 'Animations Sportives', link: '/evenements/triatlo/animations' },
        ],
        mainLink: '/evenements/triatlo',
      },
      {
        name: 'Fête du Vin 2025',
        image: 'https://i.pinimg.com/564x/3a/4b/5c/3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c.jpg',
        date: '10 - 12 Oct 2025',
        activities: [
          { name: 'Dégustations de Vin', link: '/evenements/fete-vin/degustations' },
          { name: 'Ateliers Œnologiques', link: '/evenements/fete-vin/ateliers' },
        ],
        mainLink: '/evenements/fete-vin',
      },
    ];
    await Event.insertMany(events);

    // Insérer des coups de cœur
    const coupDeCoeurItems = [
      {
        name: 'Restaurant La Cala',
        description: 'Un restaurant de fruits de mer avec vue sur la mer.',
        category: 'restaurant',
        image: 'https://i.pinimg.com/564x/5a/6b/7c/5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c.jpg',
      },
      {
        name: 'Hôtel Costa Brava',
        description: 'Un hôtel 4 étoiles idéal pour un séjour relaxant.',
        category: 'hotel',
        image: 'https://i.pinimg.com/564x/22/e0/25/22e025a2be1481376455d424593041db.jpg',
      },
      {
        name: 'Agence Immo Platja',
        description: 'Experts en immobilier pour trouver votre maison de rêve.',
        category: 'agence-immo',
        image: 'https://i.pinimg.com/564x/9c/0d/1e/9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e.jpg',
      },
      {
        name: 'Artisan Local',
        description: 'Artisan spécialisé dans les produits faits main.',
        category: 'artisans',
        image: 'https://i.pinimg.com/564x/7b/8c/9d/7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d.jpg',
      },
    ];
    await CoupDeCoeur.insertMany(coupDeCoeurItems);

    // Insérer des dons
    const donations = [
      { amount: 10, donorEmail: 'test@example.com', date: new Date() },
      { amount: 20, donorEmail: 'another@example.com', date: new Date() },
      { amount: 50, donorEmail: 'donor3@example.com', date: new Date() },
      { amount: 100, donorEmail: 'donor4@example.com', date: new Date() },
      { amount: 25, donorEmail: 'donor5@example.com', date: new Date() },
      { amount: 75, donorEmail: 'donor6@example.com', date: new Date() },
    ];
    await Donation.insertMany(donations);

    console.log('Données insérées avec succès');
  } catch (error) {
    console.error('Erreur lors de l’insertion des données:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();