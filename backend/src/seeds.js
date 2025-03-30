

const mongoose = require('mongoose');
const Product = require('./models/Product');
const ForumPost = require('./models/ForumPost');
const Guide = require('./models/Guide');
const Event = require('./models/Event');
const CoupDeCoeur = require('./models/CoupDeCoeur');
const Donation = require('./models/Donation');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '../.env' });

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    console.log('Connexion à MongoDB avec URI:', process.env.MONGO_URI); // Pour déboguer

    // Supprimer toutes les données existantes
    await Product.deleteMany();
    await ForumPost.deleteMany();
    await Guide.deleteMany();
    await Event.deleteMany();
    await CoupDeCoeur.deleteMany();
    await Donation.deleteMany();
    await User.deleteMany();

    // Insérer des utilisateurs
    const users = [
      { email: 'alice@example.com', password: await bcrypt.hash('password123', 10) },
      { email: 'bob@example.com', password: await bcrypt.hash('password456', 10) },
      { email: 'clara@example.com', password: await bcrypt.hash('password789', 10) },
    ];
    await User.insertMany(users);

    // Insérer des produits
    const products = [
      { name: 'T-Shirt Platja Vibes', price: 25, category: 'tshirts', image: 'https://i.postimg.cc/kg9YYbTn/f1.jpg', description: 'Un t-shirt élégant pour les amoureux de Platja d’Aro.' },
      { name: 'T-Shirt Costa Brava', price: 20, category: 'tshirts', image: 'https://i.postimg.cc/2yhT2kvb/f2.jpg', description: 'Parfait pour un look décontracté sur la Costa Brava.' },
    ];
    await Product.insertMany(products);

// Insérer des coups de cœur avec distance, highlights et website
const coupDeCoeurItems = [
  {
    name: "Park Hotel San Jorge & Spa",
    description: "Perché en première ligne sur le Cap Roig, cet hôtel offre une vue à couper le souffle sur les criques de Bella Dona et Cap Roig. Les chambres, spacieuses et empreintes de confort, sont équipées avec soin pour un séjour sans faute. Le spa, intimiste et chaleureux, invite à la détente dans une atmosphère feutrée. Très prisé, ce lieu emblématique de la Costa Brava exige une réservation anticipée pour les week-ends courus.",
    category: "hotel",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/74220825.jpg?k=97fac2bef7b1f3513fafc89c20c23cba540849151c29e0ddfd910086ab4517ce&o=&hp=1",
    additionalImages: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/586157285.jpg?k=7e351b727d5a5e592d6ce6e87cf38e2d24d054034ec5c71c538192e6b71b0ed5&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501050819.jpg?k=21225eed6e6266245efe50a66365691416572e822573fad719db8d95cf04dedd&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/586157275.jpg?k=e77a41b381d02195eab2a08e01389528b7873a62ea41d3a27bf155b54f0e4049&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/586157279.jpg?k=15038fa461a00ea53f234e3ab6db826e20d3c16615a1abfc7507ac704e2f7b0b&o=&hp=1"
    ],
    rating: 4.7,
    highlighted: true,
    address: "Cap Roig, Platja d'Aro, Costa Brava, Espagne",
    website: "https://www.parkhotelsanjorge.com/",
    michelinStars: 0,
    distance: "2.5 km",
    highlights: ["Vue panoramique sur les criques", "Spa intimiste", "Première ligne de mer"]
  },
  {
    name: "Hotel Planamar",
    description: "Récemment rénové, ce joyau moderne s’impose comme une halte incontournable à Platja d’Aro. Idéalement situé en bord de plage, il conjugue confort irréprochable et design soigné. Les chambres, refaites à neuf, offrent tout le nécessaire pour une escapade réussie, tandis que la piscine sur le toit ajoute une touche de sérénité face à la mer. Un emplacement parfait pour découvrir la ville à pied.",
    category: "hotel",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261807208.jpg?k=5718fcededb71d4607e29b31377bd9bd4b251706109b1f1f091a025440c91e1e&o=",
    additionalImages: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/202120120.jpg?k=dc41f1fa8078616911461256eacbda9dd0cb032366d8caaf6ffeb1d788f92058&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/261756536.jpg?k=bd20ec6d5f134d211ab7e6e13163ade4fcccf71b80a7fd18e9fb58ce97257563&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/462146190.jpg?k=ec41f020922c49f29f54366757d0c03578c90e2588e84df2b112364c53f96405&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/28136041.jpg?k=1a7ae8e9ecb09b390baebaec4e7e1111769c976d8ca854c136a70e3fc57ced39&o=&hp=1"
    ],
    rating: 4.5,
    highlighted: true,
    address: "Avinguda de la Platja, Platja d'Aro, Espagne",
    website: "https://www.hotelplanamar.com/",
    michelinStars: 0,
    distance: "0.3 km",
    highlights: ["Piscine sur le toit avec vue mer", "Récemment rénové", "Accès direct à la plage"]
  },
  {
    name: "Hostal de la Gavina",
    description: "Niché sur l’une des plus belles promenades de la Costa Brava, cet établissement de renom est un havre de paix d’exception. Son emplacement unique, à deux pas de la plage de S’Agaró, en fait un refuge idéal pour se ressourcer. Les chambres classiques, parées de luxe discret, s’ouvrent sur des vues marines envoûtantes, tandis que le spa et les jardins méditerranéens complètent cette expérience mémorable.",
    category: "hotel",
    image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/336490065.jpg?k=3ae52cc327618a768069694d8a79950cb91b38354f5663b53eb974a673488d2a&o=",
    additionalImages: [
      "https://cf.bstatic.com/xdata/images/hotel/max500/336489980.jpg?k=6a647871b057386b07d9b9d58affc77f415035caad7e831c9fd3e0be02351d82&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/443592880.jpg?k=e024db3057abfbe3b5996e62549a54c93af8b8f12b7474df7228b7d377f95442&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/32085855.jpg?k=84c6de3b067e09695dc5f55030131d9e15c91775573f572b61333ab5771d8d5b&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/336489982.jpg?k=dc31035c80bb26d2f31556eb2df629d87de5942cfca09c4c9c1ea1b3927b276f&o=&hp=1"
    ],
    rating: 4.9,
    highlighted: true,
    address: "Passeig de Sant Pol, 17220 S'Agaró, Costa Brava, Espagne",
    website: "https://www.lagavina.com/",
    michelinStars: 0,
    distance: "2 km",
    highlights: ["Vues marines exceptionnelles", "Jardins méditerranéens", "Proximité plage de S’Agaró"]
  },
  {
    name: "Pizzeria Roma",
    description: "Dans ce lieu vibrant, la cadence soutenue n’entache en rien la qualité. Les pizzas, façonnées avec soin, rivalisent d’excellence avec des viandes parfaitement maîtrisées. Apprécié des locaux pour son authenticité, cet établissement marie avec brio les saveurs catalanes et italiennes dans une atmosphère conviviale qui ne trompe pas.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/8c/e5/4f/pizzeria-roma.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://pizzeriaroma.cat/wp-content/uploads/slider/cache/04205391b969d1a343dfc532aa7f98a6/IMG_9142-1-scaled.jpg",
      "https://pizzeriaroma.cat/wp-content/uploads/slider/cache/883617cb875b1efbabbfdd3f021f19a8/foto_2.png",
      "https://pizzeriaroma.cat/wp-content/uploads/slider/cache/1524f2472d6bc9a9583cc271bbd9439b/11e63b4b-4c7f-4d8b-a7f6-f53d2b68ab4e.jpg"
    ],
    rating: 4.5,
    highlighted: false,
    address: "Avenida Del Cavall Bernat, 113, 17250 Platja d'Aro, Castell-Platja d'Aro, Espagne",
    website: "https://pizzeriaroma.cat/",
    michelinStars: 0,
    distance: "0.8 km",
    highlights: ["Authenticité italo-catalane", "Ambiance conviviale", "Qualité constante"]
  },
  {
    name: "Enjoy It",
    description: "Incontournable pour un déjeuner rapide ou un apéritif entre amis, ce lieu séduit par son rapport qualité-prix irréprochable. Le décor, inspiré d’une jungle luxuriante, crée un cadre sympathique et dépaysant. Une adresse prisée pour sa fraîcheur et sa simplicité, parfaite pour une pause gourmande sans prétention.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/ee/6d/73/caption.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/ad/2d/b2/caption.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/f3/a7/39/precioso.jpg?w=600&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/4d/9b/42/photo2jpg.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.4,
    highlighted: false,
    address: "Avinguda De S'Agaró, 77, 17250 Platja d'Aro, Castell-Platja d'Aro, Espagne",
    website: "https://enjoyitrestaurant.com/", // Site hypothétique basé sur recherches, à confirmer
    michelinStars: 0,
    distance: "0.2 km",
    highlights: ["Décor jungle original", "Excellent rapport qualité-prix", "Idéal pour un apéritif"]
  },
  {
    name: "Avaia Tapas & Cocktails",
    description: "Plébiscité par les locaux et les Français de Platja d’Aro, cet établissement excelle dans l’art de l’accueil. Tenue par une équipe chaleureuse et professionnelle, cette adresse offre une expérience conviviale où tapas et cocktails s’entrelacent avec finesse. Un lieu de choix pour une soirée mémorable.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/9d/d1/da/caption.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/dd/f8/f3/noche.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/dd/f8/f1/bar-de-avaia.jpg?w=1000&h=-1&s=1",
      "https://www.topgirona.com/wp-content/uploads/2023/03/Avaia-Tapas-Cocktails-Platja-dAro-1024x683.jpg"
    ],
    rating: 4.6,
    highlighted: false,
    address: "Avenida Del Cavall Bernat, 49, 17250 Gérone, Espagne",
    website: "https://avaiatapas.com/", // Site hypothétique, à confirmer
    michelinStars: 0,
    distance: "0.5 km",
    highlights: ["Accueil chaleureux", "Tapas et cocktails variés", "Ambiance locale"]
  },
  {
    name: "Meson Asador",
    description: "Une table de référence pour savourer les saveurs locales, où le tartare se distingue par sa finesse. Fréquenté par les habitants pour le déjeuner, ce lieu conjugue authenticité et maîtrise dans une atmosphère sans chichi. Une adresse sûre pour les amateurs de cuisine traditionnelle bien exécutée.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/99/e0/bd/fachada.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/99/dd/df/cabrito.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/99/da/0e/pecera-de-corcho.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/99/da/19/chuleton-de-rubia-gallega.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.5,
    highlighted: false,
    address: "Avenida Castell d'Aro N 86, 17249 Platja d'Aro, Castell-Platja d'Aro, Espagne",
    website: "https://mesonasadorplatjadaro.com/", // Site hypothétique, à confirmer
    michelinStars: 0,
    distance: "1.5 km",
    highlights: ["Cuisine traditionnelle catalane", "Tartare exceptionnel", "Atmosphère authentique"]
  },
  {
    name: "Restaurant Dgust",
    description: "À l’écart de l’agitation de la grande avenue, ce petit refuge lové dans une ruelle paisible séduit par sa simplicité raffinée. La cuisine, empreinte d’une touche orientale subtile, est exécutée avec soin dans une ambiance familiale et intimiste. Une adresse discrète mais précieuse.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/ca/a3/3c/caption.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/23/63/b9/dgust-restaurant.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/d9/95/8e/caption.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/d9/95/8f/caption.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.4,
    highlighted: false,
    address: "C. Església, 56, 17250 Platja d'Aro, Castell-Platja d'Aro, Espagne",
    website: null, // Pas de site officiel évident trouvé
    michelinStars: 0,
    distance: "0.4 km",
    highlights: ["Cuisine orientale raffinée", "Cadre intimiste", "Loin de l’agitation"]
  },
  {
    name: "Tinars",
    description: "Étoilé au Guide Michelin, ce restaurant incarne l’excellence dans un cadre enchanteur. La cuisine catalane, revisitée avec une précision rare, s’appuie sur des produits d’une fraîcheur irréprochable. Le jardin-terrasse, luxuriant et apaisant, sublime cette expérience gastronomique où chaque détail compte.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/cc/59/47/caption.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/2a/e8/01/l-orangerie.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/35/f6/1e/caption.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/07/04/21/els-tinars.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.8,
    highlighted: false,
    address: "Ctra. de St. Feliu a Girona, km 7,2, 17240 Llagostera, Espagne",
    website: "https://www.tinars.cat/",
    michelinStars: 1,
    distance: "15 km",
    highlights: ["Étoile Michelin", "Jardin-terrasse enchanteur", "Produits ultra-frais"]
  },
  {
    name: "Restaurant Villa Mas",
    description: "Posé en bord de mer, ce restaurant célèbre les produits frais avec une maîtrise exemplaire. Les spécialités locales, sublimées par une exécution irréprochable, s’épanouissent dans un cadre maritime qui invite à la contemplation. Une adresse où la simplicité devient art.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/6f/2c/ee/la-villa-mas.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/d5/3e/e9/restaurant-villa-mas.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1f/62/f0/a7/restaurant-villa-mas.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.6,
    highlighted: false,
    address: "Paseo Sant Pol, 95, 17220 Sant Feliu de Guixols, Espagne",
    website: "https://villamasrestaurant.com/", // Site hypothétique, à confirmer
    michelinStars: 0,
    distance: "5 km",
    highlights: ["Bord de mer", "Spécialités locales fraîches", "Cadre contemplatif"]
  },
  {
    name: "Restaurante El Raco",
    description: "Les pieds dans le sable, cette table conviviale offre une expérience maritime sans pareille. Les plats à partager, généreux et savoureux, s’accordent à merveille avec l’ambiance décontractée du bord de mer. Un lieu où l’on revient pour le goût et la chaleur humaine.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ab/49/51/el-raco.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/74/fc/ea/el-raco.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/e0/74/54/heerlijk.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.5,
    highlighted: false,
    address: "Avinguda Torre Valentina, s/n, 17252 Sant Antoni de Calonge, Espagne",
    website: null, // Pas de site officiel évident trouvé
    michelinStars: 0,
    distance: "4 km",
    highlights: ["Pieds dans le sable", "Plats généreux à partager", "Ambiance décontractée"]
  },
  {
    name: "Sa Marinada",
    description: "Face à la mer, cet établissement élève les produits frais à un niveau rare. Les fruits de mer, d’une fraîcheur éclatante, brillent dans un menu au rapport qualité-prix remarquable. L’atmosphère festive et familiale en fait un lieu idéal pour partager des moments de joie.",
    category: "restaurant",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/f6/4f/ec/caption.jpg?w=1000&h=-1&s=1",
    additionalImages: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/db/c1/5b/caption.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b8/88/63/tenim-menu-de-dilluns.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b8/86/09/plata-freda.jpg?w=1000&h=-1&s=1",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/b8/86/08/arroz.jpg?w=1000&h=-1&s=1"
    ],
    rating: 4.7,
    highlighted: false,
    address: "Passeig del Fortin s/n, 17220 Sant Feliu de Guixols, Espagne",
    website: "https://samarinada.com/", // Site hypothétique, à confirmer
    michelinStars: 0,
    distance: "5.5 km",
    highlights: ["Fruits de mer exceptionnels", "Vue mer imprenable", "Atmosphère festive"]
  },
  {
    name: "Urbik Espai Immobiliari",
    description: "Symbole de sérieux et de professionnalisme, cette agence excelle dans l’art de l’immobilier sur la Costa Brava. Avec une approche humaine et une expertise sans faille, elle accompagne locaux et étrangers dans leurs projets, offrant sérénité et confiance à chaque transaction.",
    category: "agence-immo",
    image: "https://lh3.googleusercontent.com/p/AF1QipOgCuckNQI99r74dlQk-hbzd8Fq7CdFCabq3laR=s680-w680-h510",
    additionalImages: [
      "https://lh3.googleusercontent.com/p/AF1QipNVrUMwVxfLhz0oGoJSoCBQp07SWftp4FoKlRh2=s680-w680-h510"
    ],
    rating: 4.6,
    highlighted: false,
    address: "Carrer Dr. Fleming, 15, 17250 Platja d'Aro, Girona, Espagne",
    website: "https://www.urbik.cat/", // Site officiel trouvé
    michelinStars: 0,
    distance: "0.6 km",
    highlights: ["Expertise immobilière", "Approche humaine", "Confiance assurée"]
  }
];
await CoupDeCoeur.insertMany(coupDeCoeurItems);

    // Insérer des événements
    const eventsData = [
      { name: "Volcat Platja D'Aro E-1 2025", date: new Date('2025-02-01'), description: "Compétition de VTT prévue le 1er février 2025.", mainLink: "https://mtbdata.com" },
      { name: "Festival International du Cirque Elefant d’Or Girona", date: new Date('2025-02-20'), description: "Du 20 au 24 février 2025." },
      { name: "Carnaval de Platja d'Aro", date: new Date('2025-02-22'), description: "Du 22 février au 5 mars 2025, avec une vingtaine d'activités, dont le traditionnel Grand Défilé de Chars et de Troupes.", mainLink: "https://www.platjadaro.com" },
      { name: "Black Music Festival", date: new Date('2025-02-13'), description: "Du 13 février au 23 mars 2025." },
      { name: "Rally KH-7 Costa Brava", date: new Date('2025-03-13'), description: "73ᵉ édition du rallye automobile historique prévue du 13 au 15 mars 2025 à Gérone." },
      { name: "Tour de Catalogne (cyclisme)", date: new Date('2025-03-15'), description: "Course cycliste sur route à étapes se déroulant en mars 2025.", mainLink: "https://fr.wikipedia.org/wiki/Tour_de_Catalogne" },
      { name: "Eurofirms Girona – Costa Brava Challenger 2025", date: new Date('2025-03-24'), description: "Tournoi de tennis ATP Challenger prévu du 24 au 30 mars 2025 à Gérone.", mainLink: "https://en.wikipedia.org/wiki/Girona_Challenger" },
      { name: "Open Internacional Femení Solgironès", date: new Date('2025-03-30'), description: "Tournoi international de tennis féminin prévu à La Bisbal d'Empordà à partir du 30 mars 2025.", mainLink: "https://cadenaser.com" },
      { name: "Costa Brava Stage Run 2025", date: new Date('2025-04-25'), description: "Course à pied en étapes le long de la Costa Brava, prévue du 25 au 27 avril 2025, offrant des parcours de 86,8 km et 124,9 km.", mainLink: "https://www.finishers.com" },
      { name: "Torneig Internacional de Tennis Femení Platja d'Aro 365", date: new Date('2025-05-05'), description: "Tournoi international de tennis féminin prévu du 5 au 11 mai 2025 à Platja d'Aro.", mainLink: "https://www.itftennis.com" },
      { name: "WTT Youth Contender Platja d'Aro 2025", date: new Date('2025-05-20'), description: "Tournoi international de tennis de table prévu du 20 au 23 mai 2025.", mainLink: "https://www.ittf.com" },
      { name: "Festival de la Voix (a)phònica à Banyoles", date: new Date('2025-06-24'), description: "Autour du 24 juin 2025." },
      { name: "Festival de musique de la Vallée de Camprodon", date: new Date('2025-06-24'), description: "Du 24 juin au 21 août 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Figueres es MOU", date: new Date('2025-07-02'), description: "Du 2 au 7 juillet 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Estiu&Jazz", date: new Date('2025-07-04'), description: "Du 4 au 7 juillet 2025.", mainLink: "https://los40.com" },
      { name: "Festival Cap Roig 2025", date: new Date('2025-07-12'), description: "25ᵉ anniversaire de ce festival de musique, prévu du 12 juillet au 18 août 2025 dans les Jardins de Cap Roig.", mainLink: "https://cadenaser.com" },
      { name: "Festival de musique de Sant Pere de Rodes", date: new Date('2025-07-13'), description: "Du 13 juillet au 24 août 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Festival de la guitare de Gérone", date: new Date('2025-07-15'), description: "De la seconde moitié de juillet jusqu'à la première semaine de septembre 2025." },
      { name: "Festival international de musique du château de Peralada", date: new Date('2025-07-15'), description: "En juillet et août 2025." },
      { name: "Festival de musique des jardins de Cap Roig à Calella de Palafrugell", date: new Date('2025-07-15'), description: "Début juillet à mi-août 2025." },
      { name: "Festival de musique de Cadaqués", date: new Date('2025-07-15'), description: "Première semaine d’août 2025." },
      { name: "Festival Sons del Món", date: new Date('2025-07-15'), description: "Festival de musique prévu en juillet 2025 à Roses, avec The Beach Boys le 26 juillet.", mainLink: "https://los40.com" },
      { name: "Festival de la Porta Ferrada à Sant Feliu de Guíxols", date: new Date('2025-07-15'), description: "De mi-juillet à mi-août 2025.", mainLink: "https://www.platjadaroholidays.com" },
      { name: "Festival de musique Isaac Albéniz Camprodon", date: new Date('2025-07-20'), description: "Du 20 juillet au 9 août 2025." },
      { name: "Sea Jazz l’Estartit", date: new Date('2025-07-24'), description: "Du 24 au 28 juillet 2025." },
      { name: "Festival Sons del Món Empordà", date: new Date('2025-07-25'), description: "Du 25 juillet au 10 août 2025." },
      { name: "Festival de musique de Torroella de Montgrí", date: new Date('2025-07-25'), description: "Fin juillet à mi-août 2025.", mainLink: "https://en.wikipedia.org/wiki/Festival_de_Torroella_de_Montgrí" },
      { name: "Festival de Torroella de Montgrí", date: new Date('2025-08-02'), description: "Du 2 au 22 août 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Festival de musique de Calonge", date: new Date('2025-08-01'), description: "En août 2025." },
      { name: "Schubertíada à Vilabertran", date: new Date('2025-08-15'), description: "De mi-août à la première semaine de septembre 2025." },
      { name: "Musicant à Campllong", date: new Date('2025-08-25'), description: "Fin août et début septembre 2025.", mainLink: "https://www.diarioas.com" },
      { name: "Festival Acústica à Figueres", date: new Date('2025-09-01'), description: "Première semaine de septembre 2025." },
      { name: "100x100 Half Platja d'Aro 2025", date: new Date('2025-10-01'), description: "Triathlon prévu début octobre 2025, incluant des distances Half Ironman, Triathlon M et Triathlon S.", mainLink: "https://www.finishers.com" },
      { name: "Temporada Alta", date: new Date('2025-10-01'), description: "D’octobre à décembre 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Festival international de cinéma de Begur", date: new Date('2025-10-03'), description: "Du 3 au 12 octobre 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Platja d'Aro DanceSport Festival 2025", date: new Date('2025-10-24'), description: "Festival de danse sportive prévu du 24 au 26 octobre 2025, incluant le Championnat du Monde WDSF Senior I Standard.", mainLink: "https://platjadarodancesport.com" },
      { name: "Festival de cinéma de Gérone", date: new Date('2025-11-04'), description: "Du 4 au 9 novembre 2025." },
      { name: "FlamenGI, Festival de flamenco de Girona", date: new Date('2025-11-08'), description: "Du 8 au 29 novembre 2025.", mainLink: "https://www.costabrava.org" },
      { name: "Festival Càntut", date: new Date('2025-11-14'), description: "Du 14 au 16 novembre 2025.", mainLink: "https://www.ittf.com" },
      { name: "Festival de la bière à Platja d'Aro", date: new Date('2025-12-31'), description: "Date à confirmer." },
    ];
    await Event.insertMany(eventsData);

    // Ajoute ici les autres collections (ForumPost, Guide, Donation) si besoin
    // Par exemple :
    // await ForumPost.insertMany([]);
    // await Guide.insertMany([]);
    // await Donation.insertMany([]);

    console.log('Données insérées avec succès');
  } catch (error) {
    console.error('Erreur lors de l’insertion des données:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();