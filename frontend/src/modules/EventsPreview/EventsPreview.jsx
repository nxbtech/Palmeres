// modules/EventsPreview/EventsPreview.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Section from '../../components/Section/Section';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import './EventsPreview.scss';

const EventsPreview = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/events')
      .then((res) => {
        if (!res.ok) throw new Error('Error fetching events');
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

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p className="error">{error}</p>;
  if (events.length === 0) return <p className="empty">No upcoming events.</p>;

  return (
    <Section title="Upcoming Events">
      <div className="events-grid">
        {events.map((event) => (
          <Card
            key={event._id}
            title={`${format(new Date(event.date), 'dd MMM', { locale: fr })} - ${event.name}`}
            description={event.description}
            actionText="Learn More"
            link={event.mainLink}
          />
        ))}
      </div>
      <Button href="/calendar" className="more-btn">See All Events</Button>
    </Section>
  );
};

export default EventsPreview;