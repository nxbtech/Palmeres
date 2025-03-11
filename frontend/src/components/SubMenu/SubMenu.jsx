import React, { useState, useEffect } from 'react';
import './SubMenu.scss';

const SubMenu = () => {
  const [meilleuresOffers, setMeilleuresOffers] = useState([]);
  const [derniereMinuteOffers, setDerniereMinuteOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/offers?category=meilleures')
      .then((res) => res.json())
      .then((data) => setMeilleuresOffers(data));
    fetch('http://localhost:5000/api/offers?category=derniere-minute')
      .then((res) => res.json())
      .then((data) => setDerniereMinuteOffers(data));
  }, []);

  return (
    <>
      <input hidden type="checkbox" id="sub-menu__check" className="sub-menu__check" />
      <label htmlFor="sub-menu__check" className="sub-menu">
        <label htmlFor="sub-menu__check">
          <i className="sub-menu__close-btn bx bx-x-circle"></i>
        </label>
        <div className="sub-menu__places">
          <p className="sub-title__text">MEILLEURES</p>
          <h2 className="title__text --title__text-underline sub-menu__text">OFFRES</h2>
          {meilleuresOffers.map((offer) => (
            <div key={offer._id} className="sub-menu__place-wrap">
              <img src={offer.image} alt={offer.name} />
              <div className="sub-menu__place-info">
                <h5>{offer.name}</h5>
                <p>
                  <i className="bx bx-map"></i>{offer.location}
                </p>
                <a href={offer.link} className={`pri-btn sub-menu__btn --${offer.name.toLowerCase().replace(/\s/g, '')}-btn-color`}>
                  À PARTIR DE {offer.price}€
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="dest__item sub-menu__dest-item dest__platja">
          <img src="./assets/images/arch.png" alt="Plage" />
          <div className="dest__item-info">
            <p className="dest__item-title">Platja d’Aro</p>
            <p className="dest__item-text">{meilleuresOffers.length} OFFRES</p>
          </div>
          <div className="dest__overlay">
            <h5>Offres</h5>
            <ul className="dest__overlay-list">
              {meilleuresOffers[0]?.activities.map((activity) => (
                <li key={activity.link} className="dest__overlay-item">
                  <a href={activity.link} className="dest__overlay-link">{activity.name}</a>
                </li>
              ))}
              <a href="/offres" className="dest__overlay-btn">VOIR LA DESTINATION</a>
            </ul>
          </div>
        </div>
        <div className="sub-menu__places">
          <p className="sub-title__text">DERNIÈRE</p>
          <h2 className="title__text --title__text-underline sub-menu__text">MINUTE</h2>
          {derniereMinuteOffers.map((offer) => (
            <div key={offer._id} className="sub-menu__place-wrap">
              <img src={offer.image} alt={offer.name} />
              <div className="sub-menu__place-info">
                <h5>{offer.name}</h5>
                <p>
                  <i className="bx bx-map"></i>{offer.location}
                </p>
                <a href={offer.link} className={`pri-btn sub-menu__btn --${offer.name.toLowerCase().replace(/\s/g, '')}-btn-color`}>
                  À PARTIR DE {offer.price}€
                </a>
              </div>
            </div>
          ))}
        </div>
      </label>
    </>
  );
};

export default SubMenu;