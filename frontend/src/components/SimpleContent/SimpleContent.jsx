// frontend/src/components/SimpleContent/SimpleContent.jsx
import React from 'react';
import './SimpleContent.scss';

const SimpleContent = ({ title, message }) => {
  return (
    <div className="simple-content">
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
};

export default SimpleContent;