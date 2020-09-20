import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends React.Component {
  state = {
    largeImageURL: '',
  };

  getURL = largeImageURL => {
    this.setState({ largeImageURL: largeImageURL });
    this.props.onItemClick(this.state.largeImageURL);
  };

  render() {
    const { gallery, toggleModal } = this.props;

    return (
      <ul className="ImageGallery">
        {gallery.map(image => (
          <ImageGalleryItem
            key={image.id}
            webformatURL={image.webformatURL}
            tags={image.tags}
            modal={() => toggleModal(image.largeImageURL)}
          />
        ))}
      </ul>
    );
  }
}
