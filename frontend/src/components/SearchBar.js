import React, { useState } from 'react';

function SearchBar({ onMovieSelect, movies, onSearchChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a movie"
      />
    </div>
  );
}

export default SearchBar;
