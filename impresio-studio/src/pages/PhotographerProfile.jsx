import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GalleryCarousel from '../components/GalleryCarousel';
import ReviewCard from '../components/ReviewCard';
import InquiryModal from '../components/InquiryModal';

const PhotographerProfile = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const response = await fetch(`http://localhost:3001/photographers/${id}`);
        if (!response.ok) throw new Error('Photographer not found');
        const data = await response.json();
        setPhotographer(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  if (!photographer) return <div className="text-center py-10">Photographer not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <img
              src={photographer.profilePic || 'https://via.placeholder.com/300'}
              alt={photographer.name}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{photographer.name}</h1>
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{photographer.rating.toFixed(1)}</span>
              <span className="mx-2">|</span>
              <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{photographer.location}</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{photographer.bio}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Pricing</h2>
              <p className="text-2xl font-bold text-purple-600">₹{photographer.price.toLocaleString()}</p>
              <p className="text-gray-600">Starting price for a standard session</p>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Styles & Tags</h2>
              <div className="flex flex-wrap gap-2">
                {photographer.styles.map(style => (
                  <span key={style} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                    {style}
                  </span>
                ))}
                {photographer.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Send Inquiry
            </button>
          </div>
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
          <GalleryCarousel images={photographer.portfolio} />
        </div>
        
        <div className="p-6 border-t">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {photographer.reviews.length > 0 ? (
            photographer.reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
      
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photographerName={photographer.name}
      />
    </div>
  );
};

export default PhotographerProfile;