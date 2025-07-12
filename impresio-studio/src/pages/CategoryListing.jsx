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

  // Show smart suggestion banner after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSmartSuggestion(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const loadMore = () => {
    setVisiblePhotographers((prev) => prev + 6);
  };

  const getSmartSuggestion = () => {
    if (photographers.length === 0) return '';

    const popularStyle = photographers
      .flatMap((p) => p.styles)
      .reduce((acc, style) => {
        acc[style] = (acc[style] || 0) + 1;
        return acc;
      }, {});

    const mostPopularStyle =
      Object.entries(popularStyle).sort((a, b) => b[1] - a[1])[0]?.[0] || 'photography';

    return `Top-rated ${mostPopularStyle.toLowerCase()} photographers in ${
      filters.city || 'your area'
    }`;
  };

  // Error state
  if (error) {
    return <div className="py-10 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="mb-6 text-3xl font-bold">
        Maternity Photographers in {filters.city || 'Bengaluru'}
      </h1>

      {/* Smart Suggestion */}
      {showSmartSuggestion && (
        <div className="mb-6 rounded-lg bg-purple-100 p-4 text-purple-800">
          <p className="font-medium">💡 Smart Suggestion: {getSmartSuggestion()}</p>
        </div>
      )}

      {/* Search Bar */}
      <SearchBar />

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <FilterSidebar />
        </div>

        {/* Photographer Cards */}
        <div className="lg:w-3/4">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {photographers
                  .slice(0, visiblePhotographers)
                  .map((photographer) => (
                    <PhotographerCard
                      key={photographer.id}
                      photographer={photographer}
                    />
                  ))}
              </div>

              {/* Load More Button */}
              {visiblePhotographers < photographers.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    className="rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
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
