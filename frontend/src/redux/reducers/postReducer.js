import { ADD_NEW_COMMENT, ADD_NEW_REPLY, ADD_REACTION, GET_ALL_COMMENTS } from "../actions/commentActions";
import { ADD_POST,
    GET_POST,
    DELETE_POST,
    POST_LOADING,
    GET_NEWEST_POSTS_BY_SECTION,
    CLEAR_POSTS,
    CLEAR_POST,
    GET_POSTS_BY_SECTION_AND_CATEGORY,
    SEARCH_POSTS,
    GET_MORE_POSTS_BY_CATEGORY, EDIT_POST } from "../actions/types";

const initialState = {
    posts: [],
    post: {
    },
    newestPosts: [],
    loading: false,
    loadingComments: false,
    comments: [],
    start: 1,
    count: 5,
    morePosts: [],
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
                    comments: [objectToAdd, ...currComment.comments],
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
        case ADD_NEW_COMMENT:
            return {
                ...state,
                comments: [action.payload.comment, ...state.comments],
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
