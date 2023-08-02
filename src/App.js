import React, { useState, useEffect } from 'react';
import { fetchMovies, fetchMovieDetails } from './api';
import './App.css';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [sortingOption, setSortingOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async () => {
    try {
      const data = await fetchMovies(searchTerm, 1);
      console.log(data);
      if (data && data.Search && data.Search.length > 0) {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 12));
        setError(null);
        setShowPopup(false);
      } else {
        setMovies([]);
        setError('No movies found');
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoadMore = async () => {
    try {
      const nextPage = currentPage + 1;
      const data = await fetchMovies(searchTerm, nextPage);
      console.log(data);
      if (data && data.Search && data.Search.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setCurrentPage(nextPage);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleViewDetails = async (imdbID) => {
    try {
      const movieDetails = await fetchMovieDetails(imdbID);
      setSelectedMovie(movieDetails);
      setDetailsVisible(true);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch movie details.');
    }
  };
  
  

  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setDetailsVisible(false);
  };

  const handleSortBy = (option) => {
    setSortingOption(option);
  };

  const [sortedMovies, setSortedMovies] = useState([]);

  useEffect(() => {
    let sortedMovies = [...movies];
    if (sortingOption === 'title') {
      sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortingOption === 'year') {
      sortedMovies.sort((a, b) => a.Year.localeCompare(b.Year));
    } else if (sortingOption === 'type') {
      sortedMovies.sort((a, b) => a.Type.localeCompare(b.Type));
    }
    setSortedMovies(sortedMovies);
  }, [movies, sortingOption]);

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
        <select value={sortingOption} onChange={(e) => handleSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="title">Title</option>
          <option value="year">Year</option>
          <option value="type">Type</option>
        </select>
      </div>
      {error && <p>{error}</p>}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>No movies found</p>
          </div>
        </div>
      )}
      <ul className="movie-list">
        {sortedMovies.map((movie) => (
          <li key={movie.imdbID} className="movie-item">
            <img src={movie.Poster} alt={movie.Title} />
            <div>
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
              {!detailsVisible && (
                <button onClick={() => handleViewDetails(movie.imdbID)} className="view-details-button">
                  View Details
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {selectedMovie  && (
              <div className="movie-details-popup active">
                <div className="movie-details">
                  <h3>{selectedMovie.Title}</h3>
                  <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="popup-movie-poster" />
                  <p>{selectedMovie.Plot}</p>
                  <p>Cast: {selectedMovie.Actors}</p>
                  <p>Genre: {selectedMovie.Genre}</p>
                  <p>Release Date: {selectedMovie.Released}</p>
                  <button onClick={handleCloseDetails} className="close-button">
                    Close
                  </button>
                </div>
              </div>
            )}
      {currentPage < totalPages && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default App;