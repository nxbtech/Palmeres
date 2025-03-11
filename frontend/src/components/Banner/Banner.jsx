import React from 'react';
import './Banner.scss';

const Banner = ({ title, subtitle, image }) => {
  return (
    <section className="ban_sec">
      <div className="ban_container">
        <div className="ban_img">
          <img src={image} alt="banner" />
          <div className="ban_text">
            <strong>
              <span>{subtitle}</span>
              <br />
              {title}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;