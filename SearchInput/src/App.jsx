import React, { useState, useEffect } from 'react';
import './App.css';
import Data from './resources/countryData.json';

import './App.css';

function CountrySearch() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isEscapePressed, setIsEscapePressed] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filteredResults = Data.filter(({ name }) =>
      name.toLowerCase().startsWith(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const renderResults = () => (
    searchResults.map((result, index) => (
      <div key={index} className="result-item">
        {result.name}
      </div>
    ))
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuery('');
        setSearchResults([]);
        setIsEscapePressed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isEscapePressed) {
      setIsEscapePressed(false);
    }
  }, [isEscapePressed]);

  return (
    <div className="CountrySearchContainer">
      <input
  type="text"
  id="searchInput"
  onChange={handleInputChange}
  placeholder="Enter Country Name"
  className="search-input"
/>

      <button id="searchBtn" className="search-button">
        Search
      </button>
      <div className="search-results">{renderResults()}</div>
    </div>
  );
}

export default CountrySearch;
