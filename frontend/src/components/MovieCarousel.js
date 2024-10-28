import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieCarousel = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleMovies = 5; 

  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
        const sortedMovies = response.data.results
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .slice(0, 10);
        setMovies(sortedMovies);
      } catch (error) {
        console.error("Error fetching recent movies:", error);
      }
    };
    fetchRecentMovies();
  }, [apiKey]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>❮</button>
      <div className="carousel">
        <div 
          className="movie-list" 
          style={{ transform: `translateX(-${currentIndex * (100 / visibleMovies)}%)` }}
        >
          {movies.map((movie, index) => (
            <div 
              className={`movie-item ${index === currentIndex ? 'highlighted' : ''}`} 
              key={movie.id} 
              onClick={() => onMovieSelect(movie)}
            >
              {movie.poster_path ? (
                <img
                  className="movie-poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="no-poster">No Image Available</div>
              )}
              <p>{movie.title} ({new Date(movie.release_date).getFullYear()})</p>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>❯</button>
    </div>
  );
};

export default MovieCarousel;
