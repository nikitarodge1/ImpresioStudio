import { useState, useEffect } from 'react';
import { usePhotographers } from '../context/PhotographerContext';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import PhotographerCard from '../components/PhotographerCard';
import SkeletonLoader from '../components/SkeletonLoader';

const CategoryListing = () => {
  const { photographers, loading, error, filters } = usePhotographers();
  const [visiblePhotographers, setVisiblePhotographers] = useState(6);
  const [showSmartSuggestion, setShowSmartSuggestion] = useState(false);

  useEffect(() => {
    // Show smart suggestion after 2 seconds
    const timer = setTimeout(() => {
      setShowSmartSuggestion(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const loadMore = () => {
    setVisiblePhotographers(prev => prev + 6);
  };

  const getSmartSuggestion = () => {
    if (photographers.length === 0) return '';
    
    const topRated = [...photographers].sort((a, b) => b.rating - a.rating)[0];
    const popularStyle = photographers
      .flatMap(p => p.styles)
      .reduce((acc, style) => {
        acc[style] = (acc[style] || 0) + 1;
        return acc;
      }, {});
    
    const mostPopularStyle = Object.entries(popularStyle).sort((a, b) => b[1] - a[1])[0]?.[0] || 'photography';
    
    return `Top-rated ${mostPopularStyle.toLowerCase()} photographers in ${filters.city || 'your area'}`;
  };

  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Maternity Photographers in {filters.city || 'Bengaluru'}</h1>
      
      {showSmartSuggestion && (
        <div className="bg-purple-100 text-purple-800 p-4 rounded-lg mb-6">
          <p className="font-medium">💡 Smart Suggestion: {getSmartSuggestion()}</p>
        </div>
      )}
      
      <SearchBar />
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <FilterSidebar />
        </div>
        
        <div className="lg:w-3/4">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {photographers.slice(0, visiblePhotographers).map(photographer => (
                  <PhotographerCard key={photographer.id} photographer={photographer} />
                ))}
              </div>
              
              {visiblePhotographers < photographers.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryListing;