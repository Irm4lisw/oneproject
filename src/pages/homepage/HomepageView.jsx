import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoveButton from "../../components/LoveButton";
import { useSelector } from "react-redux";

export default function HomepageView({
  all,
  popular,
  tv,
  people,
  allweek,
  darkTheme,
}) {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [view, setView] = useState("today");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const defaultPoster = "path/to/default/image.jpg";

  const posters = all
    .filter((all) => all.backdrop_path)
    .map((all) => `https://image.tmdb.org/t/p/w500/${all.backdrop_path}`) || [
    defaultPoster,
  ];

  const titles = all
    .filter((all) => all.backdrop_path)
    .map((all) => all.name || all.original_title);

  const describe = all.filter((all) => all.overview).map((all) => all.overview);

  useEffect(() => {
    if (posters.length === 0) return;

    const interval = setInterval(() => {
      setCurrentPosterIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [posters.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
      } text-white pb-10
      `}
    >
      {posters.length > 0 && (
        <section className="relative">
          {/* <div
            className="w-full h-[330px] bg-cover bg-center "
            style={{ backgroundImage: `url(${posters[currentPosterIndex]})`, 
            transition: "background-image 1s ease-in-out",}}
          > */}
          <div
            className="w-full h-[330px]"
            style={{
              backgroundImage: `${
                isDarkMode
                  ? "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1))"
                  : "linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.1))"
              }, url(${posters[currentPosterIndex]})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              paddingTop: "0rem",
              transition: "background-image 1s ease-in-out",
            }}
          >
            <div
              className={`flex flex-col justify-start pt-10 pl-8 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <h1
                className={`flex justify-start text-6xl font-bold pb-5 ${
                  isDarkMode ? "text-gray-100" : "text-white"
                }`}
              >
                Welcome
              </h1>
              <h1 className="flex justify-start  text-3xl font-medium text-white">
                {titles[currentPosterIndex]}
              </h1>
              <p className="mt-2 text-left font-light text-base line-clamp-2 mb-5 pr-10 text-white">
                {describe[currentPosterIndex]}
              </p>
            </div>

            <div className="">
              <form onSubmit={handleSearch}>
                <label className="input input-bordered flex items-center gap-2 mx-7 mt-2 rounded-3xl ">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="grow cari text-black"
                    placeholder="Cari sebuah film"
                  />
                  <button type="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor text-black"
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
            </div>
          </div>
        </section>
      )}

      <div className="pt-10 mx-10">
        <div className="flex justify-start items-center ">
          <h4
            className={`flex justify-start text-3xl font-bold text-black ml-5 mt-5 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Trending All
          </h4>
          <div className="relative ml-7 mt-5">
            <button
              onClick={() => setView("today")}
              className={`h-12 w-40 py-2 px-4 rounded-l-3xl text-sm font-medium ${
                view === "today"
                  ? isDarkMode
                    ? "bg-gray-300 text-black"
                    : "bg-gray-900 text-white"
                  : isDarkMode
                  ? "bg-gray-900 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setView("week")}
              className={`h-12 w-40 py-2 px-4 rounded-r-3xl text-sm font-medium ${
                view === "week"
                  ? isDarkMode
                    ? "bg-gray-300 text-black"
                    : "bg-gray-900 text-white"
                  : isDarkMode
                  ? "bg-gray-900 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {view === "today" ? (
          <section className="relative">
            <div className="w-full min-h-[350px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
              {all.length > 0 ? (
                all.map((themoviedb, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
                  >
                    <Link to={`/detail/${themoviedb.id}`}>
                      <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                        <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
                          <div className="w-full h-full absolute rounded-2xl overflow-hidden">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${
                                themoviedb.poster_path ||
                                themoviedb.profile_path
                              }`}
                              className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
                            />
                          </div>
                          {/* <div className="absolute bottom-0 left-0 right-0 w-full h-[70px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
                            <span className="font-bold text-lg text-neutral-300">
                              {themoviedb.original_title ||
                                themoviedb.original_name ||
                                themoviedb.name}
                            </span>
                            <span className="font-normal text-neutral-200 text-xs line-clamp-2">
                              {themoviedb.overview}
                            </span>
                          </div> */}
                          <div className="pt-2 pl-2">
                            <LoveButton popular={themoviedb} />
                          </div>
                        </div>
                        <h3
                          className={`text-lg font-bold pt-4 ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {themoviedb.original_title ||
                            themoviedb.original_name ||
                            themoviedb.name}
                        </h3>
                      </div>
                    </Link>
                    <div className="flex justify-start ml-2">
                      <div
                        className="radial-progress bg-blue-950 text-primary-content border-blue-900 border-4 bottom-8 left-14 w-8 h-8 text-xs p-1"
                        style={{ "--value": "60", "--thickness": "4px" }}
                        role="progressbar"
                      >
                        {themoviedb.vote_average}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </section>
        ) : (
          <section className="relative">
            <div className="w-full min-h-[350px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
              {allweek.length > 0 ? (
                allweek.map((themoviedb, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
                  >
                    <Link to={`/detail/${themoviedb.id}`}>
                      <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                        <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
                          <div className="w-full h-full absolute rounded-2xl overflow-hidden">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${
                                themoviedb.poster_path ||
                                themoviedb.profile_path
                              }`}
                              className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
                            />
                          </div>
                          {/* <div className="absolute bottom-0 left-0 right-0 w-full h-[90px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
                            <span className="font-bold text-lg text-neutral-300">
                              {themoviedb.original_title ||
                                themoviedb.original_name ||
                                themoviedb.name}
                            </span>
                            <span className="font-normal text-neutral-200 text-xs line-clamp-2">
                              {themoviedb.overview}
                            </span>
                          </div> */}
                          <div className="pt-2 pl-2">
                            <LoveButton popular={themoviedb} />
                          </div>
                        </div>
                        <h3
                          className={`text-lg font-bold pt-4 ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {themoviedb.original_title ||
                            themoviedb.original_name ||
                            themoviedb.name}
                        </h3>
                      </div>
                    </Link>
                    <div className="flex justify-start ml-2">
                      <div
                        className="radial-progress bg-blue-950 text-primary-content border-blue-900 border-4 bottom-8 left-14 w-8 h-8 text-xs p-1"
                        style={{ "--value": "60", "--thickness": "4px" }}
                        role="progressbar"
                      >
                        {themoviedb.vote_average}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </section>
        )}
      </div>

      <section className="relative mt-10 mx-10">
        <h4
          className={`flex justify-start text-3xl font-bold text-black ml-5 mt-5 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Trending The Movies
        </h4>

        <div className="w-full min-h-[350px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
          {popular.length > 0 ? (
            popular.map((themoviedb, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px] relative"
              >
                <Link to={`/detail/${themoviedb.id}`}>
                  <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                    <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
                      <div className="w-full h-full absolute rounded-2xl overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${themoviedb.poster_path}`}
                          className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
                        />
                      </div>
                      {/* <div className="absolute bottom-0 left-0 right-0 w-full h-[90px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0 pb-2">
                        <span className="font-semibold text-lg text-neutral-300 pb-6">
                          {themoviedb.original_title}
                        </span> */}
                      {/* <span className="font-normal text-neutral-200 text-xs line-clamp-2 mb-4">
                          {themoviedb.overview}
                        </span> */}
                      {/* </div> */}
                      <div className="pt-2 pl-2">
                        <LoveButton popular={themoviedb} />
                      </div>
                    </div>
                    <h3
                      className={`text-lg font-bold pt-4 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {themoviedb.original_title ||
                        themoviedb.original_name ||
                        themoviedb.name}
                    </h3>
                  </div>
                </Link>
                <div className="flex justify-start ml-2">
                  <div
                    className="radial-progress bg-blue-950 text-primary-content border-blue-900 border-4 bottom-8 left-14 w-8 h-8 text-xs p-1"
                    style={{ "--value": "40", "--thickness": "4px" }}
                    role="progressbar"
                  >
                    {themoviedb.vote_average}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>

      <section className="relative mt-10 mx-10">
        <h4
          className={`flex justify-start text-3xl font-bold text-black ml-5 mt-5 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Trending The Tv
        </h4>

        <div className="w-full min-h-[350px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
          {tv.length > 0 ? (
            tv.map((themoviedb, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
              >
                <Link to={`/detail/${themoviedb.id}`}>
                  <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                    <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
                      <div className="w-full h-full absolute rounded-2xl overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${
                            themoviedb.poster_path || themoviedb.profile_path
                          }`}
                          className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
                        />
                      </div>
                      {/* <div className="absolute bottom-0 left-0 right-0 w-full h-[85px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0 pb-2">
                        <span className="font-bold text-lg text-neutral-300 pb-6">
                          {themoviedb.name}
                        </span>
                         <span className="font-normal text-neutral-200 text-xs line-clamp-2">
                          {themoviedb.overview}
                        </span>
                      </div> */}
                      <div className="pt-2 pl-2">
                        <LoveButton popular={themoviedb} />
                      </div>
                    </div>
                    <h3
                      className={`text-lg font-bold pt-4 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {themoviedb.original_title ||
                        themoviedb.original_name ||
                        themoviedb.name}
                    </h3>
                  </div>
                </Link>
                <div className="flex justify-start ml-2">
                  <div
                    className="radial-progress bg-blue-950 text-primary-content border-blue-900 border-4 bottom-8 left-14 w-8 h-8 text-xs p-1"
                    style={{ "--value": "70", "--thickness": "4px" }}
                    role="progressbar"
                  >
                    {themoviedb.vote_average}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>

      <section className="relative mt-10 mx-10">
        <h4
          className={`flex justify-start text-3xl font-bold text-black ml-5 mt-5 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Trending The People
        </h4>

        <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
          {people.length > 0 ? (
            people.map((themoviedb, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
              >
                <Link to={`/detail/${themoviedb.id}`}>
                  <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
                    <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
                      <div className="w-full h-full absolute rounded-2xl overflow-hidden">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${themoviedb.profile_path}`}
                          className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
                        />
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 right-0 w-full h-[70px] bg-opacity-60 rounded-b-2xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0 ${
                          isDarkMode
                            ? "text-white bg-[#0F1823] "
                            : "text-black bg-[#c0c0c0]"
                        }`}
                      >
                        <span
                          className={`font-bold text-lg line-clamp-11 ${
                            isDarkMode ? " text-neutral-200" : "text-gray-900"
                          }`}
                        >
                          {themoviedb.original_name}
                        </span>
                        <span
                          className={`font-normal text-xs line-clamp-2 ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {themoviedb.known_for_department}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
  );
}

// import { Link } from "react-router-dom";
// export default function HomepageView({ popular, all, people, tv }) {
//   return (
// <>

//   <section className="relative">
//     <h4 className="flex justify-start text-3xl font-bold mb-8 text-black ml-5 mt-5">
//       Trending All New
//     </h4>

//     <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
//       {all.length > 0 ? (
//         all.map((themoviedb, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
//           >
//             <Link to={`/detail/${themoviedb.id}`}>
//               <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
//                 <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
//                   <div className="w-full h-full absolute rounded-2xl overflow-hidden">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500/${themoviedb.poster_path}`}
//                       className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
//                     <span className="font-bold text-lg text-neutral-300">
//                       {themoviedb.name}
//                     </span>
//                     <span className="font-normal text-neutral-200 text-xs line-clamp-2">
//                       {themoviedb.overview}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>Loading...</p> // Show loading text if no data is available
//       )}
//     </div>
//   </section>

//   <section className="relative">
//     <h4 className="flex justify-start text-3xl font-bold mb-8 text-black ml-5 mt-5">
//       Trending The Movies
//     </h4>

//     <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
//       {popular.length > 0 ? (
//         popular.map((themoviedb, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
//           >
//             <Link to={`/detail/${themoviedb.id}`}>
//               <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
//                 <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
//                   <div className="w-full h-full absolute rounded-2xl overflow-hidden">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500/${themoviedb.poster_path}`}
//                       className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
//                     <span className="font-bold text-lg text-neutral-300">
//                       {themoviedb.original_title}
//                     </span>
//                     <span className="font-normal text-neutral-200 text-xs line-clamp-2">
//                       {themoviedb.overview}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>Loading...</p> // Show loading text if no data is available
//       )}
//     </div>
//   </section>

//   <section className="relative">
//     <h4 className="flex justify-start text-3xl font-bold mb-8 text-black ml-5 mt-5">
//       Trending The Tv
//     </h4>

//     <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
//       {tv.length > 0 ? (
//         tv.map((themoviedb, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
//           >
//             <Link to={`/detail/${themoviedb.id}`}>
//               <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
//                 <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
//                   <div className="w-full h-full absolute rounded-2xl overflow-hidden">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500/${themoviedb.poster_path}`}
//                       className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
//                     <span className="font-bold text-lg text-neutral-300">
//                       {themoviedb.name}
//                     </span>
//                     <span className="font-normal text-neutral-200 text-xs line-clamp-2">
//                       {themoviedb.overview}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>Loading...</p> // Show loading text if no data is available
//       )}
//     </div>
//   </section>

//   <section className="relative">
//     <h4 className="flex justify-start text-3xl font-bold mb-8 text-black ml-5 mt-5">
//       Trending The People
//     </h4>

//     <div className="w-full min-h-[300px] overflow-x-auto scrollbar-hide px-8 my-6 flex space-x-4">
//       {people.length > 0 ? (
//         people.map((themoviedb, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[150px] sm:w-[190px] h-[260px]"
//           >
//             <Link to={`/detail/${themoviedb.id}`}>
//               <div className="h-full bg-transparent cursor-pointer group rounded-3xl perspective-1000">
//                 <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500">
//                   <div className="w-full h-full absolute rounded-2xl overflow-hidden">
//                     <img
//                       src={`https://image.tmdb.org/t/p/w500/${themoviedb.profile_path}`}
//                       className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
//                     />
//                   </div>
//                   <div className="absolute bottom-0 left-0 right-0 w-full h-[100px] bg-[#0F1823] bg-opacity-80 rounded-b-3xl p-3 flex flex-col justify-end transition-transform duration-300 group-hover:translate-y-0">
//                     <span className="font-bold text-lg text-neutral-300">
//                       {themoviedb.original_name}
//                     </span>
//                     <span className="font-normal text-neutral-200 text-xs line-clamp-2">
//                       {themoviedb.known_for_department}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>Loading...</p> // Show loading text if no data is available
//       )}
//     </div>
//   </section>
// </>
//   );
// }

// export default function HomepageView({ popular }) {
//   try {
//     return (
//       <div className="w-full min-h-screen grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto scrollbar-hide mx-10 my-6">
//         {popular?.map((film, index) => (
//           <div key={index}>
//             <div className="w-[190px] h-[260px] bg-transparent cursor-pointer group rounded-3xl perspective-1000 ">
//               <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500 ">
//                 <div className="w-full h-full absolute rounded-2xl overflow-hidden">

//                   <img
//                     src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
//                     className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
//                   />
//                 </div>
//                 <div className="absolute flex items-end rotate-y-180 w-full h-full bg-[#0F1823] bg-opacity-20 rounded-3xl overflow-hidden group p-10 text-neutral-300 space-y-5 backface-hidden">
//                   <div className="p-5 flex flex-col">
//                     <span className="font-bold text-3xl">
//                       {film.original_title}
//                     </span>
//                   </div>
//                   <div className=" text-justify flex flex-col space-y-2">
//                     <span className="font-semibold">{film.overview}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   } catch (error) {
//     console.log(error);
//   }
// }

// // const HomepageView = () => {
// //   return (
// //     <>
// // <div className="w-full min-h-screen grid md:grid-cols-2 lg:grid-cols-3 gap-4 mx-10 my-6">
// //   <div className="w-[190px] h-[260px] bg-transparent cursor-pointer group rounded-3xl perspective-1000 ">
// //     <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180 duration-500 ">
// //       <div className="w-full h-full absolute rounded-2xl overflow-hidden">
// //         {/*letak gambar*/}{" "}
// //         <img
// //           src="https://i.pinimg.com/564x/67/a7/d8/67a7d88772c83934fce54b12b54446e8.jpg"
// //           className="w-full h-full absolute top-0 left-0 -z-10 brightness-[60%] group-hover:scale-125 group-hover:brightness-90 duration-200"
// //         />
// //       </div>
// //       <div className="absolute flex items-end rotate-y-180 w-full h-full bg-[#0F1823] bg-opacity-20 rounded-3xl overflow-hidden group p-10 text-neutral-300 space-y-5 backface-hidden">
// //         <div className="p-5 flex flex-col">
// //           <span className="font-bold text-3xl">
// //             {/*letak judul*/} hai
// //           </span>
// //         </div>
// //         <div className=" text-justify flex flex-col space-y-2">
// //           <span className="font-semibold">{/*letak isi*/} kamu</span>
// //         </div>
// //       </div>
// //     </div>
// //   </div>
// // </div>
// //     </>
// //   );
// // };

// // export default HomepageView;
