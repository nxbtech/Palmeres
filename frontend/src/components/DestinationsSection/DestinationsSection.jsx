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
        const currentDate = new Date('2025-03-30');
        const upcomingEvents = data
          .filter((event) => new Date(event.date) >= currentDate) // Filtrer les événements futurs
          .sort((a, b) => new Date(a.date) - new Date(b.date)) // Trier par date croissante
          .slice(0, 4); // Prendre les 4 premiers (les plus proches)
        setEvents(upcomingEvents);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="events-loader"><div className="loader-circle"></div><p>Chargement...</p></div>;
  if (error) return <p className="events-error">{error}</p>;
  if (events.length === 0) return <p className="events-empty">Aucun événement à venir prochainement.</p>;

  return (
    <section className="events-section">
      <div className="events-container">
        <h2 className="events-title">Prochains Événements</h2>
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={event._id} className={`event-card event-card-${index}`}>
              <div className="event-date">
                <span className="day">{format(new Date(event.date), 'dd')}</span>
                <span className="month">{format(new Date(event.date), 'MMM', { locale: fr }).toUpperCase()}</span>
              </div>
              <div className="event-details">
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                {event.mainLink && (
                  <a href={event.mainLink} target="_blank" rel="noopener noreferrer" className="event-link">
                    En savoir plus
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <a href="/calendar" className="pri-btn events-more-btn">Voir tout</a>
      </div>
    </section>
  );
};

export default DestinationsSection;