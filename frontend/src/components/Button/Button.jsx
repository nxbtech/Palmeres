// frontend/src/components/Button/Button.jsx
import React from 'react';
import './Button.scss';

const Button = ({ children, variant = 'primary', onClick, href, ...props }) => {
  const className = `btn ${variant === 'primary' ? 'pri-btn' : 'sec-btn'}`;

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;