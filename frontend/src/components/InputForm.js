import React, { useState } from 'react';

function InputForm({ onMovieSubmit }) {
  const [movie, setMovie] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (movie.trim()) {
      onMovieSubmit(movie);
      setMovie('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={movie}
        onChange={(e) => setMovie(e.target.value)}
        placeholder="Enter a movie name"
      />
      <button type="submit">Get Recommendations</button>
    </form>
  );
}

export default InputForm;
