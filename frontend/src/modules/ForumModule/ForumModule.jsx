// frontend/src/modules/ForumModule/ForumModule.jsx
import React, { useState, useEffect } from 'react';
import ForumSidebar from '../../components/ForumSidebar/ForumSidebar';
import MessageList from '../../components/MessageList/MessageList';
import MessageForm from '../../components/MessageForm/MessageForm';
import './ForumModule.scss';

const ForumModule = () => {
  const [activeTopic, setActiveTopic] = useState('expat');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState({});
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const topics = ['expat', 'tourisme', 'vivre', 'voyage', 'evenements'];

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

  return (
    <main className="forum-module">
      <ForumSidebar
        activeTopic={activeTopic}
        topics={topics}
        unreadCount={unreadCount}
        onTopicChange={setActiveTopic}
        onNewTopic={() => alert('Demande de nouveau sujet')}
        onSupport={() => alert('Contacter le support')}
      />
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
        <MessageList messages={messages} searchQuery={searchQuery} error={error} />
        <MessageForm
          newMessage={newMessage}
          onMessageChange={setNewMessage}
          onSubmit={handleSendMessage}
        />
      </section>
    </main>
  );
};

export default ForumModule;