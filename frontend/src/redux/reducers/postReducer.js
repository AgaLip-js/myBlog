import { ADD_POST, GET_POST, DELETE_POST, POST_LOADING, GET_NEWEST_POSTS_BY_SECTION, CLEAR_POSTS, CLEAR_POST,
    GET_POSTS_BY_SECTION_AND_CATEGORY,
    SEARCH_POSTS,
    GET_MORE_POSTS_BY_CATEGORY, EDIT_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: {
    },
    newestPosts: [],
    loading: true,
    start: 1,
    count: 5,
    morePosts: [],
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
                start: 1,
                count: 5,
            };
        case CLEAR_POST:
            return {
                ...state,
                post: {
                },
            };
        case SEARCH_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                start: state.start + state.count,
                loading: false,
            };
        case GET_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };
        case GET_POSTS_BY_SECTION_AND_CATEGORY:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                start: state.start + state.count,
                loading: false,
            };
        case GET_NEWEST_POSTS_BY_SECTION:
            return {
                ...state,
                newestPosts: action.payload,
            };
        case GET_MORE_POSTS_BY_CATEGORY:
            return {
                ...state,
                morePosts: action.payload,
            };

        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };

        case EDIT_POST:
            return {
                ...state,
                posts: state.posts.map((post) => {
                    if (post.id === action.payload.editedPost.id) {
                        return action.payload.editedPost;
                    }
                    return post;
                }),
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
