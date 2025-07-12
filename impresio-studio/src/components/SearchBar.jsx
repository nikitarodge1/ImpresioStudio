import { useState, useEffect } from 'react';
import { usePhotographers } from '../context/PhotographerContext';

const SearchBar = () => {
  const { filters, updateFilters } = usePhotographers();
  const [searchTerm, setSearchTerm] = useState(filters.searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ searchQuery: searchTerm });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, updateFilters]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, location, or tag..."
          className="w-full p-4 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;