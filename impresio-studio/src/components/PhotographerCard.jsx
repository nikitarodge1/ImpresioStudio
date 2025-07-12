import { Link } from 'react-router-dom';

const PhotographerCard = ({ photographer }) => {
  const {
    id,
    name,
    profilePic,
    location,
    rating,
    price,
    tags,
  } = photographer;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
    
      <div className="overflow-hidden rounded-md h-48 mb-4">
  <img
    src={profilePic || 'https://via.placeholder.com/300'}
    alt={name}
    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
  />
</div>

      
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{name}</h2>
        <span className="text-sm text-yellow-600 font-semibold">⭐ {rating.toFixed(1)}</span>
      </div>

    
      <p className="text-sm text-gray-600 mb-1">📍 {location}</p>

    
      <p className="text-sm text-gray-800 font-medium mb-2">
        Starting from ₹{price.toLocaleString()}
      </p>

     
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

     
      <Link
        to={`/photographer/${id}`}
        className="block text-center bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
      >
        View Profile
      </Link>
    </div>
  );
};

export default PhotographerCard;
