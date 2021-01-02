import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADING, GET_POSTS_BY_SECTION, GET_POSTS_BY_CATEGORY, GET_NEWEST_POSTS_BY_SECTION, CLEAR_POSTS, CLEAR_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: {
    },
    newestPosts: [],
    loading: false,
};
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CLEAR_POSTS:
            return {
                ...state,
                posts: [],
            };
        case CLEAR_POST:
            return {
                ...state,
                post: {
                },
            };
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case GET_POSTS_BY_SECTION:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_POSTS_BY_CATEGORY:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case GET_NEWEST_POSTS_BY_SECTION:
            return {
                ...state,
                newestPosts: action.payload,
                loading: false,
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
            };
        default:
            return state;
    }
};

export default postReducer;
