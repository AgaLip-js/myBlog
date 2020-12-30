import { GET_CATEGORY, CATEGORY_LOADING } from "../actions/types";

const initialState = {
    category: {
    },
    loading: false,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default categoryReducer;
