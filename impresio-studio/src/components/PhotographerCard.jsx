import { Link } from 'react-router-dom';

const PhotographerCard = ({ photographer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={photographer.profilePic || 'https://via.placeholder.com/300'} 
          alt={photographer.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{photographer.name}</h3>
          <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{photographer.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {photographer.location}
        </p>
        <p className="text-gray-800 font-semibold mb-3">Starting from ₹{photographer.price.toLocaleString()}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {photographer.tags.map(tag => (
            <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          to={`/photographer/${photographer.id}`}
          className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PhotographerCard;