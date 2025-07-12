const SkeletonLoader = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skeletonCards.map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="animate-pulse">
           
            <div className="h-48 bg-gray-200" />

            
            <div className="p-4 space-y-4">
              <div className="h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-1/4 rounded bg-gray-200" />

              <div className="flex space-x-2">
                <div className="h-4 w-16 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>

              
              <div className="h-10 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
