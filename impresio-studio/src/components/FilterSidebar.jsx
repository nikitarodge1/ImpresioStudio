import { usePhotographers } from '../context/PhotographerContext';

const FilterSidebar = () => {
  const { filters, updateFilters } = usePhotographers();
  const cities = ['Bengaluru', 'Delhi', 'Mumbai', 'Hyderabad'];
  const styles = ['Traditional', 'Candid', 'Studio', 'Outdoor', 'Indoor'];

  const handleStyleToggle = (style) => {
    const newStyles = filters.styles.includes(style)
      ? filters.styles.filter(s => s !== style)
      : [...filters.styles, style];
    updateFilters({ styles: newStyles });
  };

  return (
    <div className="w-64 p-4 bg-white rounded-lg shadow-md h-fit sticky top-4">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input
          type="range"
          min="0"
          max="20000"
          step="1000"
          value={filters.priceRange[1]}
          onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], parseInt(e.target.value)] })}
          className="w-full mb-2"
        />
        <div className="flex justify-between">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Minimum Rating</h3>
        <div className="flex space-x-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              className={`px-3 py-1 rounded-full ${filters.minRating === rating ? 'bg-purple-500 text-white' : 'bg-gray-200'}`}
              onClick={() => updateFilters({ minRating: filters.minRating === rating ? 0 : rating })}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">City</h3>
        <select
          className="w-full p-2 border rounded"
          value={filters.city}
          onChange={(e) => updateFilters({ city: e.target.value })}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Styles</h3>
        <div className="space-y-2">
          {styles.map(style => (
            <label key={style} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.styles.includes(style)}
                onChange={() => handleStyleToggle(style)}
                className="mr-2"
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <select
          className="w-full p-2 border rounded"
          value={filters.sortBy}
          onChange={(e) => updateFilters({ sortBy: e.target.value })}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSidebar;