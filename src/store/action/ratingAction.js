export const ADD_RATING = "ADD_RATING";

export const addRating = (movie) => {
  return {
    type: ADD_RATING,
    payload: movie,
  };
};

// export const ADD_RATING = "ADD_RATING";
// export const DELETE_RATING = "DELETE_RATING";

// export const addRating = (movie) => {
//   return {
//     type: ADD_RATING,
//     payload: movie,
//   };
// };

// export const deleteRating = (movieId) => {
//   return {
//     type: DELETE_RATING,
//     payload: movieId,
//   };
// };

