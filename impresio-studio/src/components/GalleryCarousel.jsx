import { useState } from 'react';

const GalleryCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

 
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

 
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full">
     
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 sm:h-96 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

     
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 transform bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Previous Slide"
      >
        &lt;
      </button>

   
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-black bg-opacity-50 text-white p-2 rounded-full"
        aria-label="Next Slide"
      >
        &gt;
      </button>

      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-purple-600' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;
