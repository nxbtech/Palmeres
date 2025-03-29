import React from 'react';
import './NextHolidaySection.scss';

const NextHolidaySection = () => {
  return (
    <section className="holiday-section">
      <div className="holiday-small-container">
        <div className="holiday-image">
          <img
            src="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742936904/banniere-cdc_tviwpu.jpg"
            alt="Rejoignez Notre Forum"
          />
        </div>
        <div className="holiday-content">
          <h2 className="holiday-title">Rejoignez Notre Forum</h2>
          <a href="/forum" className="holiday-btn">Participer</a>
        </div>
      </div>
    </section>
  );
};

export default NextHolidaySection;