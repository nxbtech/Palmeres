import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout/PageLayout';
import './Forum.scss';

const Forum = () => {
  const [activeTopic, setActiveTopic] = useState('expat');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState({});
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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
        setUnreadCount((prev) => ({
          ...prev,
          [activeTopic]: 0,
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
        setUnreadCount((prev) => ({ ...prev, [activeTopic]: 0 }));
      } else {
        setError('Erreur lors de l’envoi du message');
      }
    }
  };

  const filteredMessages = messages.filter((msg) =>
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout
      title="Forum"
      subtitle="Échangez avec la communauté"
      image="https://res.cloudinary.com/drnmfxkwv/image/upload/v1742937089/banniere-forum_ascr43.jpg"
    >
      <main className="forum">
        <aside className="forum-sidebar">
          <div className="forum-sidebar-header">
            <h2 className="title__text">Sujets</h2>
          </div>
          <ul className="forum-sidebar-list">
            {['expat', 'tourisme', 'vivre', 'voyage', 'evenements'].map((topic) => (
              <li
                key={topic}
                className={`forum-sidebar-item ${activeTopic === topic ? 'active' : ''}`}
                onClick={() => setActiveTopic(topic)}
              >
                <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
                {unreadCount[topic] > 0 && (
                  <span className="forum-badge">{unreadCount[topic]}</span>
                )}
              </li>
            ))}
          </ul>
          <div className="forum-actions">
            <button className="forum-action-btn" onClick={() => alert('Demande de nouveau sujet')}>
              <i className="fas fa-plus"></i> Nouveau sujet
            </button>
            <button
              className="forum-support-btn"
              onClick={() => alert('Contacter le support')}
            >
              <i className="fas fa-headset"></i> Support
            </button>
          </div>
        </aside>
        <section className="forum-main">
          <div className="forum-header">
            <input
              type="text"
              className="forum-search"
              placeholder="Rechercher dans le chat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="forum-messages">
            {filteredMessages.length === 0 && searchQuery ? (
              <p className="forum-no-results">Aucun message trouvé.</p>
            ) : (
              <ul className="forum-messages-list">
                {filteredMessages.map((msg) => (
                  <li key={msg._id} className={`forum-message ${msg.isCurrentUser ? 'self' : ''}`}>
                    <div className="forum-message-content">
                      <span className="forum-message-sender">{msg.sender}</span>
                      <p>{msg.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {error && <p className="forum-error">{error}</p>}
          </div>
          <form onSubmit={handleSendMessage} className="forum-form">
            <input
              type="text"
              placeholder="Écrire un message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
            />
            <button type="submit" className="pri-btn">
              <i className="fas fa-paper-plane"></i> Envoyer
            </button>
          </form>
        </section>
      </main>
    </PageLayout>
  );
};

export default Forum;