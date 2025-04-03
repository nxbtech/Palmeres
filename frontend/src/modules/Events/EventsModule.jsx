// modules/Events/EventsModule.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Section from '../../components/Section/Section';
import Button from '../../components/Button/Button';
import './EventsModule.scss';

const EventsModule = () => {
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
          .filter((event) => new Date(event.date) >= currentDate)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 4);
        setEvents(upcomingEvents);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">Chargement...</div>;
  if (error) return <p className="error">{error}</p>;
  if (events.length === 0) return <p className="empty">Aucun événement à venir.</p>;

  return (
    <Section title="Prochains Événements">
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
                <Button href={event.mainLink} target="_blank" rel="noopener noreferrer">
                  En savoir plus
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button href="/calendar" className="events-more-btn">
        Voir tout
      </Button>
    </Section>
  );
};

export default EventsModule;