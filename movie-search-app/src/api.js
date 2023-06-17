import axios from 'axios';

export const fetchMovies = async (searchTerm) => {
  const apiKey = 'a223ac01';
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.status === 200) {
      return response.data.Search;
    } else {
      throw new Error(`Failed to fetch movie data. Code: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch movie data.');
  }
};