import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };
  return (
    <div>
      <Link to="/detail">
        <button
          onClick={handleClick}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 
          ${clicked ? "bg-gray-800" : "bg-white"}`}
        >
          <FaBook
            className={`h-5 w-5 ${clicked ? "text-white" : "text-gray-700"}`}
          />
        </button>
      </Link>
    </div>
  );
};

export default BookButton;
