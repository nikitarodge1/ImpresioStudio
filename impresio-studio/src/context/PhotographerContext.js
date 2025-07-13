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
        const res = await fetch('https://impresio-json-api-git-main-nikita-rodges-projects.vercel.app/photographers');
        if (!res.ok) throw new Error('Failed to fetch photographers');
        const data = await res.json();

        setPhotographers(data);
        setFilteredPhotographers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);


  useEffect(() => {
    const applyFilters = () => {
      let result = [...photographers];

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        result = result.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      if (filters.city) {
        result = result.filter(p =>
          p.location.toLowerCase() === filters.city.toLowerCase()
        );
      }

      result = result.filter(p =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );

  
      if (filters.minRating > 0) {
        result = result.filter(p => p.rating >= filters.minRating);
      }

    
      if (filters.styles.length > 0) {
        result = result.filter(p =>
          filters.styles.some(style => p.styles.includes(style))
        );
      }

      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'recent':
          result.sort((a, b) => b.id - a.id);
          break;
        default:
          break;
      }

      setFilteredPhotographers(result);
    };

    applyFilters();
  }, [filters, photographers]);

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
