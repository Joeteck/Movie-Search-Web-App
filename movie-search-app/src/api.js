import axios from 'axios';
export const fetchMovies = async (searchTerm) => {
    const apiKey = 'YOUR_API_KEY_HERE';
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`;
    
    try {
      const response = await axios.get(apiUrl);
      return response.data.Search;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch movie data.');
    }
  };
  