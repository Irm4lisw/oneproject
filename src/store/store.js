import {  configureStore } from "@reduxjs/toolkit";
import themeSlice from "./reducer/themeSlice";
import detailReducer from './reducer/detailReducer';
import favoriteReducer from "./reducer/favoriteReducer";
import ratingReducer from "./reducer/ratingReducer";
import homepageReducer from "./reducer/homepageReducer";


const store = configureStore ({
    reducer: {
        theme: themeSlice,
        detail: detailReducer,
        favorites: favoriteReducer,
        rating: ratingReducer,
        homepage: homepageReducer,
        
    },
});

export default store;