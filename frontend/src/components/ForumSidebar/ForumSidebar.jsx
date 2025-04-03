// frontend/src/components/ForumSidebar/ForumSidebar.jsx
import React from 'react';
import Button from '../Button/Button';
import './ForumSidebar.scss';

const ForumSidebar = ({ activeTopic, topics, unreadCount, onTopicChange, onNewTopic, onSupport }) => {
  return (
    <aside className="forum-sidebar">
      <div className="forum-sidebar-header">
        <h2>Sujets</h2>
      </div>
      <ul className="forum-sidebar-list">
        {topics.map((topic) => (
          <li
            key={topic}
            className={`forum-sidebar-item ${activeTopic === topic ? 'active' : ''}`}
            onClick={() => onTopicChange(topic)}
          >
            <span>{topic.charAt(0).toUpperCase() + topic.slice(1)}</span>
            {unreadCount[topic] > 0 && (
              <span className="forum-badge">{unreadCount[topic]}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="forum-actions">
        <Button
          variant="secondary"
          onClick={onNewTopic}
          className="forum-action-btn"
        >
          <i className="fas fa-plus"></i> Nouveau sujet
        </Button>
        <Button
          variant="secondary"
          onClick={onSupport}
          className="forum-support-btn"
        >
          <i className="fas fa-headset"></i> Support
        </Button>
      </div>
    </aside>
  );
};

export default ForumSidebar;