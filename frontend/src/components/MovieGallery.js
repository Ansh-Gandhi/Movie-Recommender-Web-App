import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MovieGallery({ searchTerm = '', onMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const [genericMovies, setGenericMovies] = useState([]);
  const apiKey = 'ce81e3a1'; // Replace with your OMDb API key

  useEffect(() => {
    // Fetch generic movies (e.g., popular movies) when the component mounts
    const fetchGenericMovies = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=Batman&apikey=${apiKey}`); // Example movie
        if (response.data.Response === "True") {
          setGenericMovies(response.data.Search); // Set generic movies
        }
      } catch (error) {
        console.error("Error fetching generic movies:", error);
      }
    };

    fetchGenericMovies();
  }, [apiKey]);

  useEffect(() => {
    // Fetch movies based on the search term
    const fetchMovies = async () => {
      // Ensure searchTerm is defined and trim it
      const trimmedSearchTerm = (searchTerm || '').trim();

      if (trimmedSearchTerm) {
        try {
          const response = await axios.get(`https://www.omdbapi.com/?s=${trimmedSearchTerm}&apikey=${apiKey}`);
          if (response.data.Response === "True") {
            setMovies(response.data.Search); // Set searched movies
          } else {
            setMovies([]); // Clear movies if no results
          }
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      } else {
        setMovies([]); // Clear movies if no search term
      }
    };

    fetchMovies();
  }, [searchTerm, apiKey]);

  // Combine the generic movies with searched movies
  const displayedMovies = searchTerm ? movies : genericMovies;

  return (
    <div className="movie-gallery">
      {displayedMovies.map((movie) => (
        <div className="movie-item" key={movie.imdbID} onClick={() => onMovieSelect(movie)}>
          {movie.Poster !== "N/A" ? (
            <img
              className="movie-poster"
              src={movie.Poster}
              alt={movie.Title}
            />
          ) : (
            <div className="no-poster">No Image Available</div>
          )}
          <p>{movie.Title}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieGallery;
