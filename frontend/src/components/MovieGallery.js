import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieGallery({ searchTerm = '', onMovieSelect, setMovies }) {
  const [movies, setMoviesState] = useState([]);
  const apiKey = process.env.REACT_APP_TMDB_API_KEY; 
  console.log(apiKey);

  useEffect(() => {
    const fetchMovies = async () => {
      const trimmedSearchTerm = (searchTerm || '').trim();

      if (trimmedSearchTerm) {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${trimmedSearchTerm}`);
          const filteredMovies = response.data.results.filter(movie => movie.poster_path);
          setMoviesState(filteredMovies); 
          setMovies(filteredMovies); 
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
          const popularMovies = response.data.results.filter(movie => movie.poster_path); 
          setMoviesState(popularMovies); 
          setMovies(popularMovies); 
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      }
    };

    fetchMovies();
  }, [searchTerm, apiKey, setMovies]);

  return (
    <div className="movie-gallery">
      {movies.map((movie) => (
        <div className="movie-gallery-item" key={movie.id} onClick={() => onMovieSelect(movie)}>
          {movie.poster_path ? (
            <img
              className="movie-gallery-poster"
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
  );
}

export default MovieGallery;
