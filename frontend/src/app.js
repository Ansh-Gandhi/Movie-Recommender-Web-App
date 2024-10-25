import React, { useState } from 'react';
import MovieGallery from './components/MovieGallery';
import RecommendationsList from './components/RecommendationsList';
import './app.css';
import axios from 'axios';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);

    // Call backend API to get recommendations based on the selected movie
    axios.post('http://localhost:5000/recommend', { movie: movie.Title })
      .then((response) => {
        setRecommendations(response.data.recommendations); // Assuming the API returns a 'recommendations' array
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Instruction Message */}
      <div className="instruction-message">
        Click on a movie to get recommendations!
      </div>

      {/* Conditional Rendering */}
      {searchTerm === '' ? (
        // Render Movie Gallery as Carousel
        <MovieGallery onMovieSelect={handleMovieSelect} />
      ) : (
        // Render Search Results
        <MovieGallery searchTerm={searchTerm} onMovieSelect={handleMovieSelect} />
      )}

      {/* Recommendations */}
      {selectedMovie && <h2>Recommendations for {selectedMovie.Title}</h2>}
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
}

export default App;
