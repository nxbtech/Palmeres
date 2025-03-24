import React, { useState, useEffect } from 'react';
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
        // Réinitialiser le compte de messages non lus pour le topic actif
        setUnreadCount((prev) => ({
          ...prev,
          [activeTopic]: 0, // Marquer comme lu quand le topic est sélectionné
        }));
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
        setUnreadCount((prev) => ({ ...prev, [activeTopic]: 0 })); // Réinitialiser pour le topic actif
      } else {
        setError('Erreur lors de l’envoi du message');
      }
    }
  };

  return (
    <PageLayout title="Forum" subtitle="Échangez avec nous" image="https://i.pinimg.com/564x/8b/84/49/8b8449cf9de2e1880cd774be3157960b.jpg">
      <main className="forum">
        <aside className="forum-sidebar">
          <nav className="forum-sidebar__nav">
            <h2>Sujets</h2>
            <ul>
              {['expat', 'tourisme', 'vivre', 'voyage', 'evenements'].map((topic) => (
                <li
                  key={topic}
                  className={`forum-sidebar__item ${activeTopic === topic ? 'active' : ''}`}
                  onClick={() => setActiveTopic(topic)}
                >
                  <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
                  {unreadCount[topic] > 0 && (
                    <span className="forum-badge">{unreadCount[topic]}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <section className="forum-main">
          <div className="forum-messages">
            <ul className="forum-messages__list">
              {messages.map((msg) => (
                <li key={msg._id} className={`forum-message ${msg.isCurrentUser ? 'self' : ''}`}>
                  <div className="forum-message__content">
                    <span className="forum-message__sender">{msg.sender}</span>
                    <p>{msg.content}</p>
                    <span className="forum-message__time">
                      {new Date(msg.time).toLocaleTimeString().slice(0, 5)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            {error && <p className="forum-error">{error}</p>}
            <form onSubmit={handleSendMessage} className="forum-form">
              <input
                type="text"
                placeholder="Écrire un message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
              />
              <button type="submit" className="forum-submit-btn">Envoyer</button>
            </form>
          </div>
        </section>
      </main>
    </PageLayout>
  );
};

export default Forum;