import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Calendar.scss';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState({}); // Pour "Voir plus"
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

  // Regrouper les événements par mois
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
    <PageLayout
      title="Calendrier des Événements"
      subtitle="Découvrez tous les événements à venir à Platja d’Aro"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
    >
      {/* Loader */}
      {loading && (
        <div className="calendar-loader">
          <div className="loader-circle"></div>
          <p>Chargement des événements...</p>
        </div>
      )}

      {/* Erreur ou vide */}
      {!loading && error && <div className="calendar-error">{error}</div>}
      {!loading && !error && events.length === 0 && (
        <div className="calendar-empty">Aucun événement disponible.</div>
      )}

      {/* Contenu */}
      {!loading && !error && events.length > 0 && (
        <div className="calendar-container">
          <h2 className="section-title">Calendrier</h2>
          <div className="calendar-list">
            {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => {
              const isExpanded = expandedMonths[monthYear];
              const visibleEvents = isExpanded ? monthEvents : monthEvents.slice(0, 3); // Limite à 3 par défaut

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
                        <button className="pri-btn" onClick={() => handleCardClick(event._id)}>
                          <i className="fas fa-info-circle"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                  {monthEvents.length > 3 && (
                    <button
                      className="toggle-btn"
                      onClick={() => toggleMonth(monthYear)}
                    >
                      {isExpanded ? 'Voir moins' : `Voir plus (${monthEvents.length - 3})`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Calendar;