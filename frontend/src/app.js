import React, { useState } from 'react';
import MovieCarousel from './components/MovieCarousel'; 
import MovieGallery from './components/MovieGallery'; 
import SearchBar from './components/SearchBar'; 
import RecommendationsList from './components/RecommendationsList';
import './app.css';
import axios from 'axios';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]); 

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    
    axios.post('http://localhost:5000/recommend', { movie: movie.title })
      .then((response) => {
        setRecommendations(response.data.recommendations);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  return (
    <div className="App">
      <SearchBar onMovieSelect={handleMovieSelect} movies={movies} onSearchChange={handleSearchChange} />

      <div className="instruction-message">
        Click on a movie to get recommendations!
      </div>

      {searchTerm === '' ? (
        <MovieCarousel onMovieSelect={handleMovieSelect} />
      ) : (
        <MovieGallery searchTerm={searchTerm} onMovieSelect={handleMovieSelect} setMovies={setMovies} />
      )}


      {selectedMovie && <h2>Recommendations for {selectedMovie.title}</h2>}
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
}

export default App;
