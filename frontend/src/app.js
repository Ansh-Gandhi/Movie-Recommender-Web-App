import React, { useState } from 'react';
import InputForm from './components/InputForm';
import RecommendationsList from './components/RecommendationsList';
import axios from 'axios';
import './app.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  const handleMovieSubmit = (movie) => {
    // Call the Flask backend API to get movie recommendations
    axios.post('http://localhost:5000/recommend', { movie })
      .then((response) => {
        setRecommendations(response.data.recommendations);
      })
      .catch((error) => {
        console.error("There was an error fetching the recommendations!", error);
      });
  };

  return (
    <div className="App">
      <h1>Movie Recommendation App</h1>
      <InputForm onMovieSubmit={handleMovieSubmit} />
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
}

export default App;
