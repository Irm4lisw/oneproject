import {
  SET_ALL,
  SET_POPULAR,
  SET_TV,
  SET_PEOPLE,
  SET_ALL_WEEK,
} from "../action/homepageAction";

const initialState = {
  all: [],
  popular: [],
  tv: [],
  people: [],
  allweek: [],
};

const homepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL:
      return { ...state, all: action.payload };
    case SET_POPULAR:
      return { ...state, popular: action.payload };
    case SET_TV:
      return { ...state, tv: action.payload };
    case SET_PEOPLE:
      return { ...state, people: action.payload };
    case SET_ALL_WEEK:
      return { ...state, allweek: action.payload };
    default:
      return state;
  }
};

export default homepageReducer;
