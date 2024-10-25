import axios from "axios";
import { useEffect } from "react";
import HomepageView from "./HomepageView";
import { useDispatch, useSelector } from "react-redux";
import { setAll, setPopular, setTv, setPeople, setAllWeek } from "../../store/action/homepageAction";

const Homepage = () => {
  const dispatch = useDispatch();
  const { all = [], popular = [], tv = [], people = [], allweek = [] } = useSelector((state) => state.homepage || {}); 

  const fetchData = async (url, action) => {
    try {
      const response = await axios.get(url);
      dispatch(action(response.data.results));
    } catch (error) {
      console.log(error.message); 
    }
  };

  const fetchConfigs = [
    { url: "https://api.themoviedb.org/3/trending/all/day?api_key=9d8b09a31dca488ef19fc861bfad934e", action: setAll },
    { url: "https://api.themoviedb.org/3/movie/popular?api_key=9d8b09a31dca488ef19fc861bfad934e", action: setPopular },
    { url: "https://api.themoviedb.org/3/trending/tv/day?api_key=9d8b09a31dca488ef19fc861bfad934e", action: setTv },
    { url: "https://api.themoviedb.org/3/trending/person/day?api_key=9d8b09a31dca488ef19fc861bfad934e", action: setPeople },
    { url: "https://api.themoviedb.org/3/trending/all/week?api_key=9d8b09a31dca488ef19fc861bfad934e", action: setAllWeek },
  ];

  useEffect(() => {
    fetchConfigs.forEach(({ url, action }) => fetchData(url, action));
  }, [dispatch]);


  return (
    <HomepageView all={all} popular={popular} tv={tv} people={people} allweek={allweek} />
  );
};

export default Homepage;






// import axios from "axios";
// import React, {  useEffect, useState } from "react";
// import HomepageView from "./HomepageView";

// const Homepage = () => {
//   const [popular, setPopular] = useState([]);
//   const [all, setAll] = useState([]);
//   const [people, setPeople] = useState([]);
//   const [tv, setTv] = useState([]);
//   const [allweek, setAllWeek] = useState([]);
  


//   const ambilAll = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/trending/all/day?api_key=9d8b09a31dca488ef19fc861bfad934e"
//       );
//       const dataObjek = response.data;
//       setAll(dataObjek.results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const ambilAllWeek = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/trending/all/week?api_key=9d8b09a31dca488ef19fc861bfad934e"
//       );
//       const dataObjek = response.data;
//       setAllWeek(dataObjek.results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


//   const ambilPopular = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/movie/popular?api_key=9d8b09a31dca488ef19fc861bfad934e"
//       );
//       const dataObjek = response.data;
//       setPopular(dataObjek.results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const ambilTv = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/trending/tv/day?api_key=9d8b09a31dca488ef19fc861bfad934e"
//       );
//       const dataObjek = response.data;
//       setTv(dataObjek.results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const ambilPeople = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/trending/person/day?api_key=9d8b09a31dca488ef19fc861bfad934e"
//       );
//       const dataObjek = response.data;
//       setPeople(dataObjek.results);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


//   useEffect(() => {
//     ambilAll();
//     ambilPopular();
//     ambilTv();
//     ambilPeople();
//     ambilAllWeek();
//   }, []);

//   return (
  
//     <HomepageView all={all} popular={popular} tv={tv} people={people} allweek={allweek} />

// );
// };

// export default Homepage;

