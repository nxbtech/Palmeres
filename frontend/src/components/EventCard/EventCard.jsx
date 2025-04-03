// frontend/src/components/EventCard/EventCard.jsx
import React from 'react';
import './EventCard.scss';

const EventCard = ({ name, date, onClick }) => {
  const eventDate = new Date(date);
  const day = eventDate.toLocaleDateString('fr-FR', { day: '2-digit' });
  const month = eventDate.toLocaleDateString('fr-FR', { month: 'short' });

  return (
    <div className="event-card clean" onClick={onClick}>
      <div className="event-card-date">
        <span className="day">{day}</span>
        <span className="month">{month}</span>
      </div>
      <div className="event-card-content">
        <h3>{name}</h3>
      </div>
    </div>
  );
};

export default EventCard;
