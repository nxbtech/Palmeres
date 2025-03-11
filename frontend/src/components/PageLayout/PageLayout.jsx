import React from 'react';
import Banner from '../Banner/Banner';
import './PageLayout.scss';

const PageLayout = ({ title, subtitle, image, children }) => {
  return (
    <div className="page-layout">
      <Banner title={title} subtitle={subtitle} image={image} />
      <div className="page-content">{children}</div>
    </div>
  );
};

export default PageLayout;