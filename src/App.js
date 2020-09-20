import React, { Component } from 'react';
import './App.css';

//компоненти
import Searchbar from './Component/Searchbar/Searchbar';
import ImageGallery from './Component/ImageGallery/ImageGallery';
import Button from './Component/Button/Button';
import Modal from './Component/Modal/Modal';
import Loader from './Component/Loader/Loader';

import imageApi from './services/imageApi';

class App extends Component {
  state = {
    gallery: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    largeImageURL: '',
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }

    const prevArray = prevState.gallery.length;
    const nextArray = this.state.gallery.length;

    if (prevArray !== nextArray) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;
    this.setState({ loading: true });

    imageApi
      .fetchImageWithQuery(searchQuery, page)
      .then(gallery =>
        this.setState(prevState => ({
          gallery: [...prevState.gallery, ...gallery],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      gallery: [],
    });
  };
  toggleModal = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
      isModalOpen: !this.state.isModalOpen,
    });
  };

  render() {
    const { gallery, loading, largeImageURL, isModalOpen } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} toggleModal={this.toggleModal} />
        )}
        {loading && <Loader />}
        {gallery.length > 0 && !loading && (
          <Button onClick={this.fetchImages} />
        )}
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} closeModal={this.toggleModal} />
        )}
      </div>
    );
  }
}

export default App;
