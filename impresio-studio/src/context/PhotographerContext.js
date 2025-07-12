import { createContext, useContext, useState, useEffect } from 'react';

const PhotographerContext = createContext();

export const PhotographerProvider = ({ children }) => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    minRating: 0,
    styles: [],
    city: '',
    sortBy: '',
    searchQuery: ''
  });

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await fetch('http://localhost:3001/photographers');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPhotographers(data);
        setFilteredPhotographers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, photographers]);

  const applyFilters = () => {
    let result = [...photographers];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(photographer => 
        photographer.name.toLowerCase().includes(query) ||
        photographer.location.toLowerCase().includes(query) ||
        photographer.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply city filter
    if (filters.city) {
      result = result.filter(p => p.location.toLowerCase() === filters.city.toLowerCase());
    }

    // Apply price range filter
    result = result.filter(p => 
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating);
    }

    // Apply style filter
    if (filters.styles.length > 0) {
      result = result.filter(p => 
        filters.styles.some(style => p.styles.includes(style))
      );
    }

    // Apply sorting
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'recent') {
      result.sort((a, b) => b.id - a.id);
    }

    setFilteredPhotographers(result);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <PhotographerContext.Provider 
      value={{ 
        photographers: filteredPhotographers, 
        loading, 
        error, 
        filters, 
        updateFilters 
      }}
    >
      {children}
    </PhotographerContext.Provider>
  );
};

export const usePhotographers = () => useContext(PhotographerContext);