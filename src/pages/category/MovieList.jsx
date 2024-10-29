import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MovieList = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pilihanGenre, setPilihanGenre] = useState(null);
  const [pilihanName, setPilihanName] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=9d8b09a31dca488ef19fc861bfad934e`
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

  const fetchMoviesByGenre = async (genreId, genreName) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=9d8b09a31dca488ef19fc861bfad934e&with_genres=${genreId}`
      );
      setMovies(response.data.results);
      setPilihanGenre(genreId);
      setPilihanName(genreName);
    } catch (error) {
      console.log("Error fetching movies:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-3">Loading category genres...</p>;
  }

  return (
    <div className={`${
      isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-950"
    } pt-5 pb-20
    `}>
      <h1 className="text-4xl text-center font-semibold my-8">
        Movie Categories
      </h1>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-10">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`category-card p-5 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gray-700 cursor-pointer 
              ${ isDarkMode ? "bg-gray-800 text-white" : "bg-gray-500 text-white"}`}
              onClick={() => fetchMoviesByGenre(genre.id, genre.name)}
            >
              <h2 className="text-xl font-bold">{genre.name}</h2>
            </div>
          ))}
        </div>
      </div>

      {pilihanGenre && (
        <div className="my-16">
          <h2 className="text-2xl text-center font-semibold pb-3">
          Movies in the category : 
            <span className="font-bold pl-2">{pilihanName}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 mt-4">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className={`movie-card text-white p-4 rounded-lg shadow-lg ${ isDarkMode ? "bg-gray-800" : "bg-gray-500"}`}
              >
                <figure>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-lg mb-2"
                  />
                </figure>
                <h3 className="text-lg font-bold">
                  {movie.title || movie.name}
                </h3>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
