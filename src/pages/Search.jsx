import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState("movie");
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const endpoint =
        filter === "movie"
          ? `https://api.themoviedb.org/3/search/movie?api_key=9d8b09a31dca488ef19fc861bfad934e&query=${searchQuery}`
          : `https://api.themoviedb.org/3/search/tv?api_key=9d8b09a31dca488ef19fc861bfad934e&query=${searchQuery}`;
      const response = await axios.get(endpoint);
      setResults(response.data.results);
    };
    fetchSearchResults();
  }, [searchQuery, filter]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="">
        <form onSubmit={handleSearch} className="flex items-center mb-4">
          <label className="input input-bordered border-gray-800 border-4 flex items-center w-[1000px] h-[55px] mx-7 mt-10 rounded-3xl ">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="grow cari"
              placeholder="Cari sebuah film"
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </label>
        </form>
        <div className="mb-4">
          <button
            onClick={() => setFilter("movie")}
            className={`h-12 w-56 rounded-l-lg text-lg ${
              filter === "movie"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            } hover:bg-slate-500 hover:text-white transition`}
          >
            Film
          </button>
          <button
            onClick={() => setFilter("tv")}
            className={`h-12 w-56 rounded-r-lg text-lg ${
              filter === "tv" ? "bg-gray-800 text-white" : "bg-white text-black"
            } hover:bg-slate-500 hover:text-white transition`}
          >
            TV
          </button>
        </div>
      </div>
      <div className="mb-10">
        <h1 className="text-xl pb-3 pt-4">
          Hasil Pencarian untuk <span className="font-bold">{searchQuery}</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mx-16">
        {results.length > 0 ? (
          results.map((item) => (
            <div
              key={item.id}
              className="card bg-gray-800 text-white p-5 rounded-lg w-[250px] mb-5"
            >
              <Link to={`/detail/${item.id}`}>
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${
                      item.poster_path || item.backdrop_path
                    }`}
                    alt={item.title || item.name}
                    className="rounded-lg mb-2"
                  />
                </figure>
                <h2 className="text-xl font-bold">{item.title || item.name}</h2>
                <p>{item.release_date || item.first_air_date}</p>
              </Link>
            </div>
          ))
        ) : (
          <div className="relative left-80 h-full">
            <p className="text-xl text-red-500 ">Tidak ada hasil ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
