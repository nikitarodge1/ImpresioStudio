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
        const response = await fetch(`https://impresio-json-api-git-main-nikita-rodges-projects.vercel.app/photographers/${id}`);
        if (!response.ok) throw new Error('Photographer not found');
        const data = await response.json();
        setPhotographer(data);
      } catch (err) {
        setError(err.message);
      } finally {
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

  
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="flex items-center gap-1">
                ⭐ <span className="font-semibold">{photographer.rating.toFixed(1)}</span>
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                📍 <span>{photographer.location}</span>
              </span>
            </div>


            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-700">{photographer.bio}</p>
            </div>

       
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Pricing</h2>
              <p className="text-2xl font-bold text-purple-600">
                ₹{photographer.price.toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">Starting price for a standard session</p>
            </div>

  
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Styles & Tags</h2>
              <div className="flex flex-wrap gap-2">
                {photographer.styles.map(style => (
                  <span
                    key={style}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {style}
                  </span>
                ))}
                {photographer.tags.map(tag => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
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
