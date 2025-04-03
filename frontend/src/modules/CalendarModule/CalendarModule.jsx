// frontend/src/modules/CalendarModule/CalendarModule.jsx
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import './CalendarModule.scss';

const CalendarModule = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/events')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des événements');
        return res.json();
      })
      .then((data) => {
        const sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setEvents([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCardClick = (id) => navigate(`/event/${id}`);

  const eventsByMonth = events.reduce((acc, event) => {
    const monthYear = format(new Date(event.date), 'MMMM yyyy', { locale: fr });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(event);
    return acc;
  }, {});

  const toggleMonth = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  return (
    <div className="calendar-module">
      {loading && (
        <div className="calendar-loader">
          <div className="loader-circle"></div>
          <p>Chargement des événements...</p>
        </div>
      )}

      {!loading && error && <div className="calendar-error">{error}</div>}
      {!loading && !error && events.length === 0 && (
        <div className="calendar-empty">Aucun événement disponible.</div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="calendar-container">
          <h2 className="section-title">Calendrier</h2>
          <div className="calendar-list">
            {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => {
              const isExpanded = expandedMonths[monthYear];
              const visibleEvents = isExpanded ? monthEvents : monthEvents.slice(0, 3);

              return (
                <div key={monthYear} className="calendar-month">
                  <h3 className="month-title">{monthYear}</h3>
                  <ul className="event-list">
                    {visibleEvents.map((event) => (
                      <li key={event._id} className="calendar-event">
                        <div className="event-date">
                          <span className="day">{format(new Date(event.date), 'd')}</span>
                          <span className="month">{format(new Date(event.date), 'MMM', { locale: fr })}</span>
                        </div>
                        <div className="event-content" onClick={() => handleCardClick(event._id)}>
                          <h4>{event.name}</h4>
                          <p className="description">{event.description || 'Détails à venir.'}</p>
                        </div>
                        <Button variant="primary" onClick={() => handleCardClick(event._id)}>
                          <i className="fas fa-info-circle"></i>
                        </Button>
                      </li>
                    ))}
                  </ul>
                  {monthEvents.length > 3 && (
                    <Button
                      variant="secondary"
                      onClick={() => toggleMonth(monthYear)}
                      className="toggle-btn"
                    >
                      {isExpanded ? 'Voir moins' : `Voir plus (${monthEvents.length - 3})`}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarModule;