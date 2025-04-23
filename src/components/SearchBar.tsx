import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    // Just navigate to the trademarks page with the search term
    navigate(`/search/trademarks?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto mb-12">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Trademark here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input flex-grow px-4 py-2 border rounded-md"
        />
        <button 
          type="submit"
          className="search-button px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;