import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setDetail } from "../store/action/detailAction";
import LoveButton from "../components/LoveButton";
import StarRating from "../components/StarRating";

const Detail = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const themovie = useSelector((state) => state.detail.detail);
  const dispatchRedux = useDispatch();
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [isMovie, setIsMovie] = useState(true);

  const fetchCastData = useCallback(async () => {
    try {
      const response = await axios.get(
        isMovie
          ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9d8b09a31dca488ef19fc861bfad934e`
          : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=9d8b09a31dca488ef19fc861bfad934e`
      );
      setCast(response.data.cast);
    } catch (error) {
      console.error("Error fetching cast data:", error);
    }
  }, [id, isMovie]);

  const fetchData = useCallback(async () => {
    try {
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=9d8b09a31dca488ef19fc861bfad934e`
      );
      dispatchRedux(setDetail(movieResponse.data));
      setIsMovie(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        try {
          const tvResponse = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=9d8b09a31dca488ef19fc861bfad934e`
          );
          dispatchRedux(setDetail(tvResponse.data));
          setIsMovie(false);
        } catch (error) {
          console.error("Error fetching TV data:", error);
        }
      } else {
        console.error("Error fetching movie data:", error);
      }
    }
  }, [id, dispatchRedux]);

  useEffect(() => {
    fetchData();
    fetchCastData();
  }, [fetchData, fetchCastData]);

  return (
    <div className={`${ isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"} py-2 pb-10`}>
      {themovie ? (
        <div
        className="relative m-10 rounded-sm"
        style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url("https://image.tmdb.org/t/p/w500/${themovie.backdrop_path || themovie.poster_path}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        paddingTop: "0rem",
        transition: "background-image 1s ease-in-out",
       
      }}
      >
        {/* // <div
        //    className="relative"
        //    style={{
        //      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${themovie.backdrop_path || themovie.poster_path})`,
        //      backgroundSize: "cover",
        //      backgroundPosition: "center",
        //      height: "90vh",
        //      opacity: 0.9,
        //    }}
        // > */}
          <div className="card lg:card-side bg-black bg-opacity-10">
            <figure>
              <img
                src={`https://image.tmdb.org/t/p/w500/${themovie.poster_path}`}
                alt={themovie.title}
                className="rounded-lg h-[400px] w-[300px] mb-5 mt-3 mx-10"
              />
            </figure>
            <div className="card-body">
              <div className="flex flex-col justify-start">
                <h1 className="card-title text-3xl text-white font-bold">
                  <b>{themovie.title || themovie.name}</b>
                </h1>
                <h4 className="flex justify-start text-white pt-2 space-x-2">
                  <div className="badge badge-outline">
                    {themovie.release_date}
                  </div>
                  <div className="badge badge-outline">
                    {themovie.original_title}
                  </div>
                </h4>
              </div>

              <div className="flex justify-start items-center mt-3 space-x-7">
                <LoveButton movie={themovie} />
                <div className="mb-2">
                  <StarRating
                    movie={{ ...themovie, userRating: themovie.userRating }}
                  />
                </div>
              </div>

              <div className="pt-3">
                <div className={`${ isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"} stats shadow`}>
                  <div className="stat place-items-center">
                    <div className="stat-figure text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div className={`stat-title ${ isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Popularity</div>
                    <div className="stat-value">{themovie.popularity}</div>
                  </div>

                  <div className="stat place-items-center">
                    <div className="stat-figure text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        ></path>
                      </svg>
                    </div>
                    <div className={`stat-title ${ isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Vote average</div>
                    <div className="stat-value">{themovie.vote_average}</div>
                  </div>

                  <div className="stat place-items-center">
                    <div className="stat-figure text-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-8 w-8 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                      </svg>
                    </div>
                    <div className={`stat-title ${ isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Vote count</div>
                    <div className="stat-value">{themovie.vote_count}</div>
                  </div>
                </div>
              </div>
              <p className="pt-5 max-w-[50rem] text-justify text-white">
                <span className="text-lg font-medium">Ringkasan</span><br/>
                {themovie.overview}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}

      <section className="relative mt-10 mx-10">
        <h4 className="flex justify-start text-3xl font-bold mb-8 ml-5 mt-5">
          The Cast
        </h4>

        <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
          {cast.length > 0 ? (
            cast.map((actor, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
              >
                <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                  <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
                    <div className="w-full h-full absolute rounded-2xl overflow-hidden">
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 w-full h-[50px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
                      <span className="font-bold text-lg text-neutral-300 line-clamp-1">
                        {actor.original_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Detail;


// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { setDetail } from "../store/action/detailAction";
// import LoveButton from "../components/LoveButton";
// import StarRating from "../components/StarRating";

// const Detail = () => {
//   const themovie = useSelector((state) => state.detail.detail);
//   const dispatchRedux = useDispatch();
//   const { id } = useParams();
//   const [cast, setCast] = useState([]);
//   const [isMovie, setIsMovie] = useState(true);

//   const fetchMovieData = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=9d8b09a31dca488ef19fc861bfad934e`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching movie data:", error);
//     }
//   }, [id]);

//   const fetchTvData = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         `https://api.themoviedb.org/3/tv/${id}?api_key=9d8b09a31dca488ef19fc861bfad934e`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching Tv data:", error);
//     }
//   }, [id]);

//   const fetchCastData = useCallback(async () => {
//     try {
//       const response = await axios.get(
//         isMovie
//           ? `https://api.themoviedb.org/3/movie/${id}/credits?api_key=9d8b09a31dca488ef19fc861bfad934e`
//           : `https://api.themoviedb.org/3/tv/${id}/credits?api_key=9d8b09a31dca488ef19fc861bfad934e`
//       );
//       setCast(response.data.cast);
//     } catch (error) {
//       console.error("Error fetching cast data:", error);
//     }
//   }, [id, isMovie]);

//   useEffect(() => {
//     const getData = async () => {
//       const movieData = await fetchMovieData();
//       const tvData = await fetchTvData();
//       if (movieData) {
//         dispatchRedux(setDetail(movieData));
//         setIsMovie(true);
//       } else if (tvData) {
//         dispatchRedux(setDetail(tvData));
//         setIsMovie(false);
//       }
//     };

//     getData();
//     fetchCastData();
//   }, [dispatchRedux, fetchMovieData, fetchTvData, fetchCastData, id]);

//   return (
//     <div className="Detail">
//       {themovie ? (
//         <div
//           className="relative"
//           style={{
//             backgroundImage: `url(https://image.tmdb.org/t/p/w500/${
//               themovie.backdrop_path || themovie.poster_path
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "90vh",
//             opacity: 0.8,
//           }}
//         >
          
//           <div className="card lg:card-side bg-black bg-opacity-10">
//             <figure>
//               <img
//                 src={`https://image.tmdb.org/t/p/w500/${themovie.poster_path}`}
//                 alt={themovie.title}
//                 className="rounded-lg h-[450px] w-[400px] mb-5 mt-3 mx-10"
//               />
//             </figure>
//             <div className="card-body">
//               <div className="flex flex-col justify-start">
//                 <h1 className="card-title text-3xl text-white font-bold">
//                   <b>{themovie.title || themovie.name}</b>
//                 </h1>
//                 <h4 className="flex justify-start text-white pt-2 space-x-2">
//                   <div className="badge badge-outline">
//                     {themovie.release_date}
//                   </div>
//                   <div className="badge badge-outline">
//                     {themovie.original_title}
//                   </div>
//                 </h4>
//               </div>

//               <div className="flex justify-start items-center mt-3 space-x-7">
//                 <LoveButton movie={themovie} />
//                 <div className="mb-2">
//                   <StarRating
//                     movie={{ ...themovie, userRating: themovie.userRating }}
//                   />
//                 </div>
//               </div>

//               <div className="pt-3">
//                 <div className="stats shadow">
//                   <div className="stat place-items-center">
//                     <div className="stat-figure text-secondary">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         className="inline-block h-8 w-8 stroke-current"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="stat-title">Popularity</div>
//                     <div className="stat-value">{themovie.popularity}</div>
//                   </div>

//                   <div className="stat place-items-center">
//                     <div className="stat-figure text-secondary">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         className="inline-block h-8 w-8 stroke-current"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="stat-title">Vote average</div>
//                     <div className="stat-value">{themovie.vote_average}</div>
//                   </div>

//                   <div className="stat place-items-center">
//                     <div className="stat-figure text-secondary">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         className="inline-block h-8 w-8 stroke-current"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
//                         ></path>
//                       </svg>
//                     </div>
//                     <div className="stat-title">Vote count</div>
//                     <div className="stat-value">{themovie.vote_count}</div>
//                   </div>
//                 </div>
//               </div>
//               <p className="pt-5 max-w-[50rem] text-justify text-white">
//                 <p className="text-lg font-medium"> Ringkasan </p>
//                 {themovie.overview}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center">Loading...</p>
//       )}

//       <section className="relative mt-10 mx-10">
//         <h4 className="flex justify-start text-3xl font-bold mb-8 text-black ml-5 mt-5">
//           The Cast
//         </h4>

//         <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
//           {cast.length > 0 ? (
//             cast.map((actor, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
//               >
//                 <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
//                   <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
//                     <div className="w-full h-full absolute rounded-2xl overflow-hidden">
//                       <img
//                         src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
//                         className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
//                       />
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 w-full h-[50px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
//                       <span className="font-bold text-lg text-neutral-300 line-clamp-1">
//                         {actor.original_name}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>Loading...</p>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Detail;

