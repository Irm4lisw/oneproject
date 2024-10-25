import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Delete from "../components/Delete";

const Rating = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const ratingsFromRedux = useSelector((state) => state.rating.rating);
  const [ratings, setRatings] = useState([]);

  // mengambil data dari redux terlebih dahulu lalu di localstorage untuk menyimpan data
  useEffect(() => {
    if (ratingsFromRedux.length > 0) {
      setRatings(ratingsFromRedux);
      localStorage.setItem("ratings", JSON.stringify(ratingsFromRedux));
    } else {
      const storedRatings = localStorage.getItem("ratings");
      if (storedRatings) {
        setRatings(JSON.parse(storedRatings));
      }
    }
  }, [ratingsFromRedux]);

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-950"
      } Rating pt-5 pb-20`}
    >
      <h1 className="text-4xl text-center font-semibold mt-8">Rating film</h1>
      {ratings.length === 0 ? (
        <div className="flex flex-col h-screen pt-10">
          <p className="text-center text-red-500">
            Tidak ada film yang dirating.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ml-28 mt-10">
          {ratings.map((movie) => (
            <div
              key={movie.id}
              className={`card text-white p-5 rounded-lg w-[250px] mb-5 ${
                isDarkMode ? "bg-gray-800" : "bg-gray-500"
              }`}
            >
              <Link to={`/detail/${movie.id}`}>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg mb-2"
                  />
                </figure>
                <h2 className="text-xl font-bold">
                  {movie.title || movie.name}
                </h2>
                <p>{movie.release_date}</p>
              </Link>
              <div className="flex justify-center items-center mt-3">
              <Delete/>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rating;
