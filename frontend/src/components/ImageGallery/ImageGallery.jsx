// frontend/src/components/ImageGallery/ImageGallery.jsx
import React from 'react';
import './ImageGallery.scss';

const ImageGallery = ({ mainImage, images, onImageClick }) => {
  return (
    <div className="image-gallery">
      <div className="main-image">
        <img src={mainImage} alt="Main product" />
      </div>
      <div className="thumbnail-grid">
        {images.map((img, index) => (
          <div key={index} className="thumbnail">
            <img src={img} alt={`Thumbnail ${index + 1}`} onClick={() => onImageClick(img)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;