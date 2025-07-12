import { useState, useEffect } from 'react';
import { usePhotographers } from '../context/PhotographerContext';

const SearchBar = () => {
  const { filters, updateFilters } = usePhotographers();
  const [searchTerm, setSearchTerm] = useState(filters.searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ searchQuery: searchTerm });
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, updateFilters]);

  return (
    <div className="mx-auto mb-8 w-full max-w-2xl">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
          🔍
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, location, or tag..."
          className="w-full rounded-lg border border-gray-300 p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;
