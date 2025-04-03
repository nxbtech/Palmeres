// frontend/src/components/Section/Section.jsx
import React from 'react';
import './Section.scss';

const Section = ({ title, subtitle, children, className = '' }) => (
  <section className={`section ${className}`.trim()}>
    <div className="section-container">
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </div>
  </section>
);

export default Section;