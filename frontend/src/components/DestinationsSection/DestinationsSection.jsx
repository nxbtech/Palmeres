import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import './DestinationsSection.scss';

const DestinationsSection = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/events')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des événements');
        return res.json();
      })
      .then((data) => {
        const sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
        setEvents(sortedEvents);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (events.length === 0) return <p>Aucun événement disponible.</p>;

  return (
    <section className="events-section">
      <div className="events-container">
        <div className="events-subtitle">À venir</div>
        <h2 className="events-title">Événements</h2>
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.image} alt={event.name} className="event-image" />
              <div className="event-info">
                <h3>{event.name}</h3>
                <p>
                  {format(new Date(event.date), 'd MMMM yyyy', { locale: fr })}
                </p>
              </div>
              <div className="event-overlay">
                <p>{event.description || 'Détails de l’événement à venir.'}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="events-more">
          <a href="/calendar" className="events-more-link">
            En savoir plus
            <i className="fas fa-arrow-right events-more-icon"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;