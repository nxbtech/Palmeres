import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout/PageLayout';
import './Forum.scss';

const Forum = () => {
  const [activeTopic, setActiveTopic] = useState('expat');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState({});
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/forum')
      .then((res) => {
        if (!res.ok) throw new Error('Erreur lors du chargement des messages');
        return res.json();
      })
      .then((data) => {
        const filteredMessages = data.filter((msg) => msg.topic === activeTopic);
        setMessages(filteredMessages);
        const counts = {};
        data.forEach((msg) => {
          counts[msg.topic] = (counts[msg.topic] || 0) + 1;
        });
        setUnreadCount(counts);
      })
      .catch((err) => {
        console.error('Erreur:', err);
        setMessages([]);
      });
  }, [activeTopic]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Vous devez vous inscrire ou vous connecter pour envoyer un message.');
      return;
    }
    setError('');
    if (newMessage.trim()) {
      const response = await fetch('http://localhost:5000/api/forum/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic: activeTopic, sender: 'Vous', content: newMessage, isCurrentUser: true }),
      });
      const newPost = await response.json();
      if (response.ok) {
        setMessages([...messages, newPost]);
        setNewMessage('');
        setUnreadCount((prev) => ({ ...prev, [activeTopic]: (prev[activeTopic] || 0) + 1 }));
      } else {
        setError('Erreur lors de l’envoi du message');
      }
    }
  };

  return (
    <PageLayout title="Forum" subtitle="Échangez avec nous" image="https://i.pinimg.com/564x/8b/84/49/8b8449cf9de2e1880cd774be3157960b.jpg">
      <main className="forum-app">
        <aside className="forum-sidepanel">
          <nav className="forum-sidepanel__nav">
            <h2>Sujets</h2>
            <ul>
              {['expat', 'tourisme', 'vivre', 'voyage', 'evenements'].map((topic) => (
                <li
                  key={topic}
                  className={`forum-sidepanel__nav__li ${activeTopic === topic ? 'active' : ''}`}
                  onClick={() => setActiveTopic(topic)}
                >
                  <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
                  <span className="forum-notification">{unreadCount[topic] || 0}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <section className="forum-content">
          <div className="forum-messages">
            <div className="forum-messages__header">
              <h2>{activeTopic.charAt(0).toUpperCase() + activeTopic.slice(1)}</h2>
            </div>
            <ul className="forum-messages__list">
              {messages.map((msg) => (
                <li key={msg._id} className={`forum-message ${msg.isCurrentUser ? 'forum-message--self' : ''}`}>
                  <div className="forum-bubble">
                    <div className="forum-bubble__content">
                      <span className="forum-sender">{msg.sender}</span>
                      <div className="forum-bubble__text">
                        {msg.content}
                        <span className="forum-time">{new Date(msg.time).toLocaleTimeString().slice(0, 5)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
            <form onSubmit={handleSendMessage} className="forum-input">
              <input
                type="text"
                placeholder="Écrire un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              />
              <button type="submit">Envoyer</button>
            </form>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Forum;