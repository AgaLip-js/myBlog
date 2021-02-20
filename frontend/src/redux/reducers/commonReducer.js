import { CLEAR_CATEGORY, HANDLE_SEARCH_VALUE, SET_SELECTED_CATEGORY, SET_SELECTED_SECTION, STATE_LOADING } from "../actions/globalActions";

const initialState = {
    category: "all categories",
    searchText: "",
    section: 'mainView',
    loading: true,
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case STATE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CLEAR_CATEGORY: {
            return {
                ...state,
                category: "all categories",
                loading: false,
            };
        }
        case HANDLE_SEARCH_VALUE:
            return {
                ...state,
                searchText: action.payload.searchText,
                loading: false,
            };
        case SET_SELECTED_CATEGORY: {
            return {
                ...state,
                category: action.payload.category,
                loading: false,
            };
        }
        case SET_SELECTED_SECTION: {
            return {
                ...state,
                section: action.payload.section,
                loading: false,
            };
        }
        default:
            return state;
    }
};

export default commonReducer;
