import { HANDLE_SEARCH_VALUE, SET_SELECTED_CATEGORY } from "../actions/globalActions";

const initialState = {
    category: "all categories",
    searchText: "",
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_SEARCH_VALUE:
            return {
                ...state,
                searchText: action.payload.searchText,
            };
        case SET_SELECTED_CATEGORY: {
            return {
                ...state,
                category: action.payload.category,
            };
        }
        default:
            return state;
    }
};

export default commonReducer;
