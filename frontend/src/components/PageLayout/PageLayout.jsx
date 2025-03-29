import React, { useState, useEffect } from 'react';
import Banner from '../Banner/Banner';
import './PageLayout.scss';

const PageLayout = ({ title, subtitle, image, children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState(null); // Suivi du contexte

  const affiliateOffers = [
    {
      title: 'Dîner Romantique au La Vista',
      category: 'restaurant',
      description: 'Un repas avec vue sur la mer à prix réduit.',
      affiliateLink: 'https://www.booking.com/restaurant/lavista?aid=357026',
      discount: '15% OFF',
      keywords: ['dîner', 'romantique', 'vue mer'],
    },
    {
      title: 'Séjour Luxe Hôtel Costa Brava',
      category: 'hotel',
      description: 'Réservez une nuit avec petit-déjeuner inclus.',
      affiliateLink: 'https://www.booking.com/hotel/costabrava?aid=357026',
      discount: '20% OFF',
      keywords: ['luxe', 'petit-déjeuner', 'séjour'],
    },
    {
      title: 'Visite Artisanale Guidée',
      category: 'artisans',
      description: 'Découvrez le savoir-faire local à tarif spécial.',
      affiliateLink: 'https://www.getyourguide.com/artisans-tour?partner=357026',
      discount: '10% OFF',
      keywords: ['artisanat', 'visite', 'local'],
    },
    {
      title: 'Location Vélo Platja',
      category: 'activités',
      description: 'Explorez la côte à vélo avec une remise.',
      affiliateLink: 'https://www.rentalbike.com/platja?partner=357026',
      discount: '25% OFF',
      keywords: ['vélo', 'location', 'exploration'],
    },
  ];

  useEffect(() => {
    setMessages([{ sender: 'bot', text: 'Salut ! Je suis Assistant Platja. Tapez "offre", "restaurant", "activités", "contact" ou posez-moi une question !' }]);
    if (!isChatOpen) return;

    const timer = setTimeout(() => {
      if (messages.length === 1) {
        setIsTyping(true);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { sender: 'bot', text: 'Pas d’idée ? Essayez "offre" pour une promo ou "quoi faire" pour des suggestions !' },
          ]);
          setIsTyping(false);
        }, 1000);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isChatOpen]);

  const getRandomOffer = (category = null, keyword = null) => {
    const filteredOffers = category
      ? affiliateOffers.filter((offer) => offer.category === category)
      : keyword
      ? affiliateOffers.filter((offer) => offer.keywords.some((k) => keyword.toLowerCase().includes(k)))
      : affiliateOffers;
    const offer = filteredOffers[Math.floor(Math.random() * filteredOffers.length)];
    return offer
      ? `**${offer.title}** - ${offer.discount} : ${offer.description} [Réserver](${offer.affiliateLink})`
      : 'Désolé, aucune offre ne correspond. Essayez autre chose !';
  };

  const suggestFollowUp = () => {
    const options = [
      'Envie d’autre chose ? Tapez "restaurant", "hôtel", "activités" ou "contact".',
      'Besoin d’idées ? Essayez "quoi faire" ou "offre".',
      'Une question ? Posez-la-moi directement !',
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: chatMessage }]);
    setIsTyping(true);

    setTimeout(() => {
      const msg = chatMessage.toLowerCase().trim();
      let response;

      switch (true) {
        // Navigation
        case msg === 'accueil' || msg === 'home' || msg.includes('page principale'):
          response = 'Retour à l’accueil : [Accueil](/).';
          setConversationContext('navigation');
          break;
        case msg.includes('coup de cœur') || msg.includes('recommandation') || msg.includes('favoris'):
          response = 'Voici nos coups de cœur : [Coups de Cœur](/coup-de-coeur).';
          setConversationContext('recommendations');
          break;
        case msg.includes('bons plans') || msg.includes('promo') || msg.includes('réduction'):
          response = 'Les meilleures offres ici : [Bons Plans](/bons-plans).';
          setConversationContext('offers');
          break;
        case msg === 'boutique' || msg.includes('magasin') || msg.includes('shop'):
          response = 'Explorez la boutique : [Boutique](/boutique).';
          setConversationContext('boutique');
          break;
        case msg === 'guides' || msg.includes('conseils') || msg.includes('guide'):
          response = 'Nos guides sont ici : [Guides](/guides).';
          setConversationContext('guides');
          break;
        case msg === 'forum' || msg.includes('communauté') || msg.includes('discussion'):
          response = 'Rejoignez notre communauté : [Forum](/forum).';
          setConversationContext('forum');
          break;
        case msg === 'articles' || msg.includes('blog') || msg.includes('nouvelles'):
          response = 'Lisez nos articles : [Articles](/articles).';
          setConversationContext('articles');
          break;
        case msg === 'contact' || msg.includes('nous contacter') || msg.includes('support'):
          response = 'Contactez-nous ici : [Contact](/contact).';
          setConversationContext('contact');
          break;
        case msg.includes('événement') || msg.includes('calendrier') || msg.includes('agenda'):
          response = 'Découvrez les événements : [Calendrier](/calendar).';
          setConversationContext('events');
          break;

        // Offres et Réservations
        case msg === 'offre' || msg === 'offres' || msg.includes('deal') || msg.includes('promotion'):
          response = `Voici une offre : ${getRandomOffer()}`;
          setConversationContext('offers');
          break;
        case msg.includes('restaurant') || msg.includes('dîner') || msg.includes('manger') || msg.includes('resto'):
          response = `Une suggestion resto : ${getRandomOffer('restaurant')}`;
          setConversationContext('restaurant');
          break;
        case msg.includes('hôtel') || msg.includes('séjour') || msg.includes('logement') || msg.includes('hotel'):
          response = `Un séjour pour vous : ${getRandomOffer('hotel')}`;
          setConversationContext('hotel');
          break;
        case msg.includes('artisan') || msg.includes('local') || msg.includes('artisanat'):
          response = `Une expérience artisanale : ${getRandomOffer('artisans')}`;
          setConversationContext('artisans');
          break;
        case msg.includes('activités') || msg.includes('activite') || msg.includes('loisirs'):
          response = `Une activité sympa : ${getRandomOffer('activités')}`;
          setConversationContext('activities');
          break;
        case msg.includes('vélo') || msg.includes('velo') || msg.includes('cyclisme'):
          response = `Pour les amateurs de vélo : ${getRandomOffer('activités', 'vélo')}`;
          setConversationContext('activities');
          break;
        case msg.includes('réserver') || msg.includes('reserver') || msg.includes('book'):
          response = conversationContext
            ? `Pour réserver dans cette catégorie : ${getRandomOffer(conversationContext)}`
            : 'Tapez "offre", "restaurant", "hôtel" ou autre pour une réservation !';
          break;
        case msg.includes('prix') || msg.includes('tarif') || msg.includes('combien') || msg.includes('coût'):
          response = conversationContext
            ? `Voici une offre avec prix : ${getRandomOffer(conversationContext)}`
            : 'Les prix varient. Essayez "offre" pour une idée !';
          break;

        // Aide et Support
        case msg === 'aide' || msg === 'help' || msg.includes('assistance'):
          response = 'Je suis là pour aider ! Essayez : "offre", "restaurant", "activités", "contact", "inscription", ou posez une question !';
          setConversationContext('help');
          break;
        case msg.includes('inscription') || msg.includes('compte') || msg.includes('s’inscrire'):
          response = 'Pour vous inscrire : [Inscription](/auth). Besoin d’aide ?';
          setConversationContext('account');
          break;
        case msg.includes('connexion') || msg.includes('login') || msg.includes('se connecter'):
          response = 'Connectez-vous ici : [Connexion](/auth). Mot de passe oublié ?';
          setConversationContext('account');
          break;
        case msg.includes('déconnexion') || msg.includes('logout') || msg.includes('se déconnecter'):
          response = 'Déconnexion via votre profil : [Profil](/profile).';
          setConversationContext('account');
          break;
        case msg.includes('mot de passe') || msg.includes('oublié') || msg.includes('password'):
          response = 'Réinitialisez votre mot de passe ici : [Connexion](/auth).';
          setConversationContext('account');
          break;
        case msg.includes('problème') || msg.includes('bug') || msg.includes('erreur'):
          response = 'Un souci ? Dites-m’en plus ou contactez-nous : [Contact](/contact).';
          setConversationContext('support');
          break;

        // Questions Fréquentes
        case msg.includes('où') || msg.includes('platja d’aro') || msg.includes('localisation'):
          response = 'Platja d’Aro est sur la Costa Brava, Espagne. Plus d’infos : [Guides](/guides).';
          setConversationContext('location');
          break;
        case msg.includes('quand') || msg.includes('horaire') || msg.includes('heures'):
          response = 'Les horaires dépendent. Voir [Calendrier](/calendar) ou tapez "événement" !';
          setConversationContext('events');
          break;
        case msg.includes('quoi faire') || msg.includes('activités') || msg.includes('idées'):
          response = 'Des idées : [Coups de Cœur](/coup-de-coeur), [Calendrier](/calendar), ou tapez "activités" !';
          setConversationContext('activities');
          break;
        case msg.includes('météo') || msg.includes('temps') || msg.includes('prévisions'):
          response = 'Pas de météo live, mais Platja est souvent ensoleillé ! Vérifiez ici : [Guides](/guides).';
          setConversationContext('weather');
          break;
        case msg.includes('langue') || msg.includes('français') || msg.includes('english'):
          response = 'Changez la langue en haut à droite ou demandez-moi en anglais !';
          setConversationContext('language');
          break;
        case msg.includes('nouveau') || msg.includes('news') || msg.includes('quoi de neuf'):
          response = 'Les dernières nouveautés : [Articles](/articles) ou tapez "offre".';
          setConversationContext('news');
          break;
        case msg.includes('qui êtes-vous') || msg.includes('bot') || msg.includes('qui es-tu'):
          response = 'Je suis Assistant Platja, votre guide virtuel pour Platja d’Aro ! Que puis-je faire pour vous ?';
          setConversationContext('bot');
          break;

        // Interactions Sociales
        case msg === 'bonjour' || msg === 'salut' || msg.includes('hello') || msg.includes('hi'):
          response = ['Salut ! Comment allez-vous ?', 'Bonjour ! Quoi de neuf ?', 'Hello ! Besoin d’aide ?'][Math.floor(Math.random() * 3)];
          setConversationContext('greeting');
          break;
        case msg === 'merci' || msg.includes('thanks') || msg.includes('gracias'):
          response = ['De rien !', 'Avec plaisir !', 'Ravi d’aider !'][Math.floor(Math.random() * 3)];
          break;
        case msg === 'au revoir' || msg.includes('bye') || msg.includes('ciao'):
          response = ['À bientôt !', 'Bye bye !', 'Adios, revenez vite !'][Math.floor(Math.random() * 3)];
          break;
        case msg.includes('comment vas-tu') || msg.includes('ça va') || msg.includes('how are you'):
          response = 'Je suis un bot, toujours au top ! Et vous ?';
          setConversationContext('greeting');
          break;
        case msg.includes('bien') || msg.includes('super') || msg.includes('great'):
          response = 'Génial ! Que puis-je faire pour vous ?';
          break;
        case msg.includes('mal') || msg.includes('pas bien') || msg.includes('bad'):
          response = 'Désolé de l’entendre… Une offre pour vous remonter le moral ? Tapez "offre" !';
          setConversationContext('offers');
          break;
        case msg.includes('lol') || msg.includes('haha') || msg.includes('mdr'):
          response = '😂 Trop drôle ! Quoi d’autre ?';
          break;
        case msg.includes('j’aime') || msg.includes('cool') || msg.includes('jolie'):
          response = 'Merci ! Platja d’Aro est top, non ? Essayez "quoi faire" !';
          setConversationContext('activities');
          break;

        // Demandes Spécifiques
        case msg.includes('annulation') || msg.includes('annuler') || msg.includes('cancel'):
          response = 'Pour annuler une réservation, contactez le support : [Contact](/contact).';
          setConversationContext('support');
          break;
        case msg.includes('paiement') || msg.includes('payer') || msg.includes('pay'):
          response = 'Paiement sécurisé via les liens d’offres. Tapez "offre" pour commencer !';
          setConversationContext('payment');
          break;
        case msg.includes('avis') || msg.includes('commentaires') || msg.includes('review'):
          response = 'Partagez votre avis sur [Forum](/forum) ou sur l’offre directement.';
          setConversationContext('forum');
          break;
        case msg.includes('transport') || msg.includes('bus') || msg.includes('train'):
          response = 'Infos sur les transports dans [Guides](/guides). Besoin d’un lieu précis ?';
          setConversationContext('transport');
          break;
        case msg.includes('confirmation') || msg.includes('confirmée') || msg.includes('réservation'):
          response = 'Vérifiez votre email ou contactez [Support](/contact) pour confirmation.';
          setConversationContext('support');
          break;
        case msg.includes('groupes') || msg.includes('groupe') || msg.includes('amis'):
          response = 'Pour les groupes, voir [Bons Plans](/bons-plans) ou tapez "contact".';
          setConversationContext('groups');
          break;
        case msg.includes('enfants') || msg.includes('famille') || msg.includes('kids'):
          response = 'Activités familiales ici : [Coups de Cœur](/coup-de-coeur).';
          setConversationContext('family');
          break;
        case msg.includes('animaux') || msg.includes('chien') || msg.includes('chat'):
          response = 'Animaux acceptés selon l’offre. Tapez "hôtel" ou "restaurant" pour vérifier.';
          setConversationContext('pets');
          break;
        case msg.includes('accessibilité') || msg.includes('handicap') || msg.includes('pmr'):
          response = 'Infos accessibilité dans [Guides](/guides) ou tapez "contact" pour détails.';
          setConversationContext('accessibility');
          break;
        case msg.includes('wifi') || msg.includes('internet') || msg.includes('connexion'):
          response = 'Wifi disponible selon l’offre. Tapez "hôtel" pour plus d’infos.';
          setConversationContext('hotel');
          break;
        case msg.includes('parking') || msg.includes('se garer') || msg.includes('voiture'):
          response = 'Parking selon lieu. Plus d’infos dans [Guides](/guides).';
          setConversationContext('parking');
          break;
        case msg.includes('plage') || msg.includes('mer') || msg.includes('baignade'):
          response = 'Les plages sont proches ! Détails ici : [Guides](/guides) ou tapez "activités".';
          setConversationContext('beach');
          break;
        case msg.includes('piscine') || msg.includes('nage') || msg.includes('pool'):
          response = 'Piscines dispo dans certains hôtels. Tapez "hôtel" !';
          setConversationContext('hotel');
          break;
        case msg.includes('sport') || msg.includes('fitness') || msg.includes('gym'):
          response = 'Activités sportives : [Coups de Cœur](/coup-de-coeur) ou tapez "activités".';
          setConversationContext('sports');
          break;
        case msg.includes('nuit') || msg.includes('soirée') || msg.includes('party'):
          response = 'Soirées et nightlife : [Calendrier](/calendar) ou tapez "restaurant".';
          setConversationContext('nightlife');
          break;

        // Commandes Utilitaires
        case msg === 'test' || msg === 'ça marche' || msg === 'fonctionne':
          response = 'Tout marche bien ! Essayez "offre" ou posez une question !';
          break;
        case msg === 'ok' || msg === 'oui' || msg === 'd’accord':
          response = 'Super ! Quoi d’autre ?';
          break;
        case msg === 'non' || msg.includes('pas') || msg.includes('no'):
          response = 'OK, une autre idée ? Essayez "offre" ou "activités".';
          break;
        case msg === 'plus' || msg.includes('encore') || msg.includes('autre'):
          response = conversationContext
            ? `Voici une autre suggestion : ${getRandomOffer(conversationContext)}`
            : 'Tapez "offre", "restaurant", ou autre pour plus !';
          break;
        case msg.includes('fermer') || msg.includes('stop') || msg.includes('close'):
          response = 'Cliquez sur la croix pour me fermer ! À bientôt !';
          break;
        case msg.includes('réinitialiser') || msg.includes('reset'):
          setMessages([{ sender: 'bot', text: 'Conversation réinitialisée ! Tapez "offre" ou autre pour repartir !' }]);
          setConversationContext(null);
          return;

        // Réponses Contextuelles Basées sur le Dernier Message
        case conversationContext === 'offers' && msg.includes('plus'):
          response = `Une autre offre : ${getRandomOffer()}`;
          break;
        case conversationContext === 'restaurant' && (msg.includes('menu') || msg.includes('quoi manger')):
          response = 'Les menus varient, mais voici une offre resto : [Bons Plans](/bons-plans).';
          break;
        case conversationContext === 'hotel' && (msg.includes('chambre') || msg.includes('dispo')):
          response = 'Vérifiez la disponibilité ici : [Bons Plans](/bons-plans).';
          break;

        // Réponse par Défaut
        default:
          response = [
            'Hmm, je n’ai pas compris. Essayez "offre", "activités" ou "contact" !',
            'Oups, pas sûr… Tapez "aide" pour des idées !',
            'Désolé, rien trouvé. Posez une question ou tapez "offre" !',
          ][Math.floor(Math.random() * 3)] + ' ' + suggestFollowUp();
          setConversationContext(null);
          break;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);

    setChatMessage('');
  };

  return (
    <div className="page-layout">
      <Banner title={title} subtitle={subtitle} image={image} />
      <div className="page-content">{children}</div>
      <div className={`chatbot ${isChatOpen ? 'open' : ''}`}>
        <div className="chatbot-header" onClick={() => setIsChatOpen(!isChatOpen)}>
          <span>Assistant Platja</span>
          <i className={`fas ${isChatOpen ? 'fa-times' : 'fa-comment'}`}></i>
        </div>
        {isChatOpen && (
          <div className="chatbot-content">
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <p key={index} className={`chatbot-message ${msg.sender}`}>
                  {msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                    if (part.match(/\[.*?\]\(.*?\)/)) {
                      const [text, url] = part.slice(1, -1).split('](');
                      return (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                          {text}
                        </a>
                      );
                    }
                    return part;
                  })}
                </p>
              ))}
              {isTyping && <p className="chatbot-typing">Assistant Platja tape...</p>}
            </div>
            <form onSubmit={handleChatSubmit} className="chatbot-form">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Tapez ici..."
                className="chatbot-input"
              />
              <button type="submit" className="chatbot-btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;