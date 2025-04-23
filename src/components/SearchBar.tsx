import React, { useState } from 'react';
import axios from 'axios';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        'https://vit-tm-task.api.trademarkia.app/api/v3/us', 
        {
          input_query: searchTerm,
          input_query_type: "",
          sort_by: "default",
          status: [],
          exact_match: false,
          date_query: false,
          owners: [],
          attorneys: [],
          law_firms: [],
          mark_description_description: [],
          classes: [],
          page: 1,
          rows: 10,
          sort_order: "desc",
          states: [],
          counties: []
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching trademark data:', error);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          className={`search-button px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;