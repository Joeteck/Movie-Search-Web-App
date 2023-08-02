import axios from 'axios';

export const fetchMovies = async (searchTerm, page) => {
  const apiKey = 'a223ac01';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&page=${page}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch movie data. Code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie data.');
  }
};

export const fetchMovieDetails = async (imdbID) => {
  const apiKey = 'a223ac01';
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Failed to fetch movie details. Code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie details.');
  }
};
