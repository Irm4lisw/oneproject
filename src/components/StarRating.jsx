import { useDispatch } from "react-redux";
import { addRating } from "../store/action/ratingAction";
import { useState, useEffect } from "react";

const StarRating = ({ movie }) => {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();


  useEffect(() => {
    setRating(movie.userRating || 0); // Initialize with existing user rating if available
  }, [movie]);

  const handleStarClick = (star) => {
    setRating(star);
    dispatch(addRating({ ...movie, userRating: star })); // Save rating to Redux
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`cursor-pointer text-3xl ${
            star <= rating ? "text-yellow-300" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(star)}
          aria-label={`Rate ${star} stars`}
        >
          ★
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-3 mt-3 text-white">
          You rated this {rating} {rating > 1 ? 'stars' : 'star'}
        </span>
      )}
    </div>
  );
};

export default StarRating;
