import { ADD_RATING } from "../action/ratingAction";

const initialState = {
  rating: [],
};

const ratingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RATING: {
      const existingMovieIndex = state.rating.findIndex(
        (m) => m.id === action.payload.id
      );
      if (existingMovieIndex !== -1) {
        const updatedRatings = [...state.rating];
        updatedRatings[existingMovieIndex] = action.payload;
        return { ...state, rating: updatedRatings };
      }
      return {
        ...state,
        rating: [...state.rating, action.payload],
      };
    }
    default:
      return state;
  }
};

export default ratingReducer;

// import { ADD_RATING, DELETE_RATING } from '../action/ratingAction';

// const initialState = {
//   rating: [],
// };

// const ratingReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_RATING: {
//       const existingMovieIndex = state.rating.findIndex((m) => m.id === action.payload.id);
//       if (existingMovieIndex !== -1) {
//         const updatedRatings = [...state.rating];
//         updatedRatings[existingMovieIndex] = action.payload; 
//         return { ...state, rating: updatedRatings };
//       }
//       return {
//         ...state,
//         rating: [...state.rating, action.payload],
//       };
//     }
//     case DELETE_RATING: {
//       return {
//         ...state,
//         rating: state.rating.filter(movie => movie.id !== action.payload),
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default ratingReducer;
