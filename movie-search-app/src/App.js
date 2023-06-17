import React, { useState, useEffect } from 'react';
import { fetchMovies } from './api';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async () => {
    try {
      const data = await fetchMovies(searchTerm);
      setMovies(data);
      setTotalPages(Math.ceil(data.totalResults / 10));
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (movies.length > 0) {
      const movieList = document.querySelector('.movie-list');
      if (movieList) {
        movieList.style.opacity = 1;
      }
    }
  }, [movies]);
  return (
    <div className="container">
      <h1 className="heading">Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
        <select value={""} onChange={(e) => (e.target.value)}>
          <option value="">Sort By</option>
          <option value="rating">Rating</option>
          <option value="release">Release Date</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <button onClick={""}>
                View Details
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
