export const SET_ALL = "SET_ALL";
export const SET_POPULAR = "SET_POPULAR";
export const SET_TV = "SET_TV";
export const SET_PEOPLE = "SET_PEOPLE";
export const SET_ALL_WEEK = "SET_ALL_WEEK";

export const setAll = (data) => ({ type: SET_ALL, payload: data });
export const setPopular = (data) => ({ type: SET_POPULAR, payload: data });
export const setTv = (data) => ({ type: SET_TV, payload: data });
export const setPeople = (data) => ({ type: SET_PEOPLE, payload: data });
export const setAllWeek = (data) => ({ type: SET_ALL_WEEK, payload: data });