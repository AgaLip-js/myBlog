import { ADD_NEW_COMMENT, ADD_NEW_REPLY, ADD_REACTION, GET_ALL_COMMENTS } from "../actions/commentActions";
import { ADD_POST, GET_POSTS, GET_POST, DELETE_POST, POST_LOADING, GET_POSTS_BY_SECTION, GET_POSTS_BY_CATEGORY, GET_NEWEST_POSTS_BY_SECTION, CLEAR_POSTS, CLEAR_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: {
    },
    newestPosts: [],
    loading: false,
    loadingComments: false,
    comments: [],
};

const findAndReplaceObject = (comments, objectToReplace) => {
    const co = comments.reduce((acc, currComment) => {
        if (currComment._id === objectToReplace._id) {
            return [...acc, objectToReplace];
        }
        if (currComment.comments.length) {
            const commentsChild = findAndReplaceObject(currComment.comments, objectToReplace);
            return [
                ...acc,
                {
                    ...currComment,
                    comments: commentsChild,
                },
            ];
        }
        return [...acc, currComment];
    }, []);
    return co;
};
const findAndAddObject = (comments, commentId, objectToAdd) => {
    const co = comments.reduce((acc, currComment) => {
        if (currComment._id === commentId) {
            return [
                ...acc,
                {
                    ...currComment,
                    comments: [...currComment.comments, objectToAdd],
                },
            ];
        }
        if (currComment.comments.length) {
            const commentsChild = findAndAddObject(currComment.comments, commentId, objectToAdd);
            return [
                ...acc,
                {
                    ...currComment,
                    comments: commentsChild,
                },
            ];
        }
        return [...acc, currComment];
    }, []);
    return co;
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
        case ADD_NEW_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload.comment],
            };
        case ADD_REACTION: {
            return {
                ...state,
                comments: findAndReplaceObject(state.comments, action.payload.comment),
            };
        }
        case ADD_NEW_REPLY: {
            return {
                ...state,
                comments: findAndAddObject(state.comments, action.payload.commentId, action.payload.comment),
            };
        }
        case GET_ALL_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments,
            };

        default:
            return state;
    }
};

export default postReducer;
