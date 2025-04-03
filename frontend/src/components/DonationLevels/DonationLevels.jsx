// frontend/src/components/DonationLevels/DonationLevels.jsx
import React from 'react';
import './DonationLevels.scss';

const DonationLevels = () => {
  const levels = [
    { icon: 'fas fa-star', title: 'Ami', amount: 'À partir de 10 €' },
    { icon: 'fas fa-shield-alt', title: 'Protecteur', amount: 'À partir de 25 €' },
    { icon: 'fas fa-crown', title: 'Ambassadeur', amount: 'À partir de 50 €' },
  ];

  return (
    <div className="donation-levels">
      {levels.map((level, index) => (
        <div key={index} className="donation-level">
          <i className={level.icon}></i>
          <h3>{level.title}</h3>
          <p>{level.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default DonationLevels;