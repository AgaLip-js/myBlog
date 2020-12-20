import { ADD_CONTENT, REMOVE_CONTENT, EDIT_CONTENT } from "../actions/types";

const initialState = {
    content: [],
    loading: false,
};

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONTENT:
            return {
                ...state,
                content: [...state.content, action.payload.content],
            };
        case REMOVE_CONTENT: {
            return {
                ...state,
                content: state.content.filter((c) => {
                    if (c.id !== action.payload.id) {
                        return c;
                    }
                    return null;
                }),
            };
        }
        case EDIT_CONTENT: {
            return {
                ...state,
                content: action.payload.newContent,
            };
        }
        default:
            return state;
    }
};

export default contentReducer;
