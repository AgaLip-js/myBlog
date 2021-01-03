import { GET_ALL_CATEGORIES, CATEGORY_LOADING, GET_CATEGORY_FOR_SECTION } from "../actions/types";

const initialState = {
    categories: null,
    loading: false,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories,
                loading: false,
            };
        case GET_CATEGORY_FOR_SECTION:
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default categoryReducer;
