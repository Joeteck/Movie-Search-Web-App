import React, { useState } from 'react';
import { fetchMovies } from './api';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  
  const handleSearch = async () => {
    try {
      const data = await fetchMovies(searchTerm);
      setMovies(data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div>
      <h1>Movie Search App</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
            <button>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
