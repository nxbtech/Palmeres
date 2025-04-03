// frontend/src/components/DonationForm/DonationForm.jsx
import React from 'react';
import Button from '../Button/Button';
import './DonationForm.scss';

const DonationForm = ({ amount, onAmountChange, onSubmit, supportMessage }) => {
  return (
    <form onSubmit={onSubmit} className="donation-form">
      <div className="amount-options">
        <Button type="button" variant="secondary" onClick={() => onAmountChange('10')}>10 €</Button>
        <Button type="button" variant="secondary" onClick={() => onAmountChange('25')}>25 €</Button>
        <Button type="button" variant="secondary" onClick={() => onAmountChange('50')}>50 €</Button>
      </div>
      <div className="donation-input-group">
        <input
          type="number"
          placeholder="Montant personnalisé (€)"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          min="1"
          required
        />
        <span className="donation-currency">€</span>
      </div>
      <p className="donation-support-message">{supportMessage}</p>
      <Button type="submit" variant="primary">
        <i className="fas fa-donate"></i> Donner maintenant
      </Button>
    </form>
  );
};

export default DonationForm;