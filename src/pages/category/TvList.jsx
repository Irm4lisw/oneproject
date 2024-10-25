import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TvList = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [tv, setTv] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=9d8b09a31dca488ef19fc861bfad934e`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const fetchTvByGenre = async (genreId, genreName) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=9d8b09a31dca488ef19fc861bfad934e&with_genres=${genreId}`
      );
      setTv(response.data.results);
      setSelectedGenre(genreId);
      setSelectedName(genreName);
    } catch (error) {
      console.log("Error fetching tv:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-3">Loading category genres...</p>;
  }

  return (
    <div className={`${ isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-950"} pt-5 pb-20`}>
      <h1 className="text-4xl text-center font-semibold my-8">Tv Categories</h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center mx-10">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`category-card p-5 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-blue-900 cursor-pointer 
                ${ isDarkMode ? "bg-gray-800 text-white" : "bg-gray-500 text-white"}`}
              onClick={() => fetchTvByGenre(genre.id, genre.name)}
            >
              <h2 className="text-xl font-bold">{genre.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {selectedGenre && (
        <div className="my-16">
          <h2 className="text-2xl text-center font-semibold pb-3">
            Tv in the category:
            <span className="font-bold pl-2">{selectedName}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 mt-4">
            {tv.map((tvv) => (
              <div
                key={tvv.id}
                className={`tvv-card text-white p-4 rounded-lg shadow-lg ${ isDarkMode ? "bg-gray-800" : "bg-gray-500"}`}
              >
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${tvv.poster_path}`}
                    alt={tvv.title}
                    className="rounded-lg mb-2"
                  />
                </figure>
                <h3 className="text-lg font-bold">{tvv.title || tvv.name}</h3>
                <p>{tvv.release_date || tvv.first_air_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TvList;
