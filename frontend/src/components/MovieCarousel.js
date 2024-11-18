import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MovieCarousel = ({ onMovieSelect }) => {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const [currentIndex, setCurrentIndex] = useState(0);
  const movieListRef = useRef(null);
  const visibleMovies = 5; // Adjust this number based on how many movies you want to show
  const scrollInterval = 2000; // Time interval for auto-scroll (in milliseconds)

  useEffect(() => {
    const fetchRecentMovies = async (totalMovies = 10) => {
      try {
        let allMovies = [];
        let page = 1;
        while (allMovies.length < totalMovies) {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
          const fetchedMovies = response.data.results;
          allMovies = allMovies.concat(fetchedMovies);
          page++;
        }
        allMovies = allMovies
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .slice(0, totalMovies);
        setMovies(allMovies);
      } catch (error) {
        console.error("Error fetching recent movies:", error);
      }
    };

    fetchRecentMovies(10); // Adjust this number as needed

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % (movies.length - visibleMovies + 1);
        return nextIndex;
      });
    }, scrollInterval);

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [apiKey, movies.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % (movies.length - visibleMovies + 1);
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex - 1 + (movies.length - visibleMovies + 1)) % (movies.length - visibleMovies + 1);
      return nextIndex;
    });
  };

  const getMovieWidth = () => {
    if (movieListRef.current) {
      const movieItem = movieListRef.current.querySelector('.movie-item');
      return movieItem ? movieItem.clientWidth : 0;
    }
    return 0;
  };

  const movieWidth = getMovieWidth();

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={handlePrev}>❮</button>
      <div className="carousel">
        <div
          className="movie-list"
          ref={movieListRef}
          style={{ transform: `translateX(-${currentIndex * movieWidth}px)` }}
        >
          {movies.length > 0 ? movies.map((movie, index) => (
            <div
              className="movie-item"
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
          )) : <p>Loading movies...</p>}
        </div>
      </div>
      <button className="carousel-button next" onClick={handleNext}>❯</button>
    </div>
  );
};

export default MovieCarousel;
