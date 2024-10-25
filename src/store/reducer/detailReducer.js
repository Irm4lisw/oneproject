import { SET_DETAIL } from "../action/detailAction";

const nilaiDefault = {
    detail: {},
};

const detailReducer = (state = nilaiDefault, action) => {
    switch (action.type) {
        case SET_DETAIL:
            return {
                ...state,
                detail: action.payload,
            };
            default:
            return state;
    }
};

export default detailReducer;
