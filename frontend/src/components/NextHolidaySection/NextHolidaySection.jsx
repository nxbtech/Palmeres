import React from 'react';
import './NextHolidaySection.scss';

const NextHolidaySection = () => {
  return (
    <section className="holiday-section">
      <div className="holiday-container">
        <div className="holiday-content">
          <h4>Rejoignez Notre Forum</h4>
          <a href="/forum" className="holiday-btn">Participer</a>
        </div>
      </div>
    </section>
  );
};

export default NextHolidaySection;