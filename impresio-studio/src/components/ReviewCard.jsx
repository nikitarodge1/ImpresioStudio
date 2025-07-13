const ReviewCard = ({ review }) => {
  const { name, rating, comment, date } = review;

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">{name}</h4>

      
        <div className="text-yellow-500 text-sm font-bold">
          {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
        </div>
      </div>

    
      <p className="text-gray-700 mb-2">{comment}</p>

   
      <p className="text-sm text-gray-400">
        {new Date(date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ReviewCard;
