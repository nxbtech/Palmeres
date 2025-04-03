// frontend/src/components/MessageList/MessageList.jsx
import React from 'react';
import './MessageList.scss';

const MessageList = ({ messages, searchQuery, error }) => {
  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="message-list">
      {filteredMessages.length === 0 && searchQuery ? (
        <p className="message-no-results">Aucun message trouvé.</p>
      ) : (
        <ul className="message-list-items">
          {filteredMessages.map((msg) => (
            <li key={msg._id} className={`message-item ${msg.isCurrentUser ? 'self' : ''}`}>
              <div className="message-content">
                <span className="message-sender">{msg.sender}</span>
                <p>{msg.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="message-error">{error}</p>}
    </div>
  );
};

export default MessageList;