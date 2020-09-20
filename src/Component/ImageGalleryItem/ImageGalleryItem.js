import React from 'react';

const ImageGalleryItem = ({ webformatURL, tags, modal }) => {
  return (
    <li className="ImageGalleryItem" onClick={modal}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
