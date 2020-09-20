import axios from 'axios';

const API_KEY = '17616381-c9f1bd5d2d7147e0d5bf2f873';

const fetchImageWithQuery = (searchQuery, page) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
};

export default {
  fetchImageWithQuery,
};
