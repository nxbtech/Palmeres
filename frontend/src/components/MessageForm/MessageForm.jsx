// frontend/src/components/MessageForm/MessageForm.jsx
import React from 'react';
import Button from '../Button/Button';
import './MessageForm.scss';

const MessageForm = ({ newMessage, onMessageChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="message-form">
      <input
        type="text"
        placeholder="Écrire un message..."
        value={newMessage}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
      />
      <Button type="submit" variant="primary">
        <i className="fas fa-paper-plane"></i> Envoyer
      </Button>
    </form>
  );
};

export default MessageForm;