import React, { useState } from 'react';

function SearchBar({ onMovieSelect, movies }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a movie"
      />
      {searchQuery && (
        <ul className="search-results">
          {filteredMovies.map((movie, index) => (
            <li key={index} onClick={() => onMovieSelect(movie)}>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
