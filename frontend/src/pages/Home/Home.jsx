// frontend/src/pages/Home/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import Section from '../../components/Section/Section';
import EventCard from '../../components/EventCard/EventCard';
import CardGrid from '../../components/CardGrid/CardGrid';
import Banner from '../../components/Banner/Banner';
import AffiliateSection from '../../components/AffiliateSection/AffiliateSection';
import './Home.scss';

const Home = () => {
  const navigate = useNavigate();

  const calendarEvents = [
    { _id: '1', name: 'Festival de Platja d’Aro', date: '2025-05-15', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205' },
    { _id: '2', name: 'Rencontre communautaire', date: '2025-06-10', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
  ];

  const guides = [
    { _id: '1', name: 'Portrait de Platja d’Aro', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', category: 'tourist' },
    { _id: '2', name: 'Vivre ici en tant qu’expat', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded', category: 'expat' },
    { _id: '3', name: 'Catalogne : carnet de route', image: 'https://images.unsplash.com/photo-1533174072545-2d4f133466de', category: 'tourist' },
  ];

  const bestSellers = [
    { _id: '1', name: 'Carnet Palmeres', image: 'https://via.placeholder.com/200', price: 14 },
    { _id: '2', name: 'Poster Platja d’Aro', image: 'https://via.placeholder.com/200', price: 20 },
    { _id: '3', name: 'Carte postale illustrée', image: 'https://via.placeholder.com/200', price: 5 },
  ];

  const hotels = [
    {
      name: 'Hôtel Costa Brava',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      description: 'Vue mer et charme local pour un séjour immersif à Platja d’Aro.',
      url: 'https://booking.com',
    },
    {
      name: 'Hôtel Mediterrani',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
      description: 'Moderne, central, idéal pour les explorateurs urbains.',
      url: 'https://airbnb.com',
    },
    {
      name: 'Hôtel Platja d’Or',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24c32',
      description: 'Accès plage & ambiance conviviale, parfait en famille.',
      url: 'https://skyscanner.com',
    },
  ];

  return (
    <div className="home">
      <Hero backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" />
      
      <Section title="À ne pas manquer à Platja d’Aro">
        <div className="event-grid">
          {calendarEvents.map((event) => (
            <EventCard
              key={event._id}
              image={event.image}
              name={event.name}
              date={event.date}
              onClick={() => navigate(`/calendar`)}
            />
          ))}
        </div>
      </Section>

      <Banner
        title="Rejoignez notre Communauté"
        description="Partagez vos expériences et découvrez celles des autres voyageurs sur notre forum."
        ctaText="Accéder au Forum"
        ctaAction={() => navigate('/forum')}
        backgroundImage="https://images.unsplash.com/photo-1517457373958-b7bdd4587205"
      />

      <AffiliateSection hotels={hotels} />

      <Section title="Explorez, découvrez, vivez">
        <CardGrid
          items={guides}
          onCardClick={(id) => navigate(`/guide/${id}`)}
          cardClassName="guide-card"
        />
      </Section>

      <Section title="Objets à collectionner">
        <CardGrid
          items={bestSellers}
          onCardClick={(id) => navigate(`/product/${id}`)}
          cardClassName="bestseller-card"
        />
      </Section>
    </div>
  );
};

export default Home;
