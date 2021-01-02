import axios from "axios";
import { returnErrors } from "./errorAction";
import { ADD_POST, CLEAR_ERRORS, DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS, POST_LOADING,
    GET_POSTS_BY_SECTION, GET_POSTS_BY_CATEGORY, GET_NEWEST_POSTS_BY_SECTION, CLEAR_POSTS, CLEAR_POST } from "./types";

// Set loading state
export const setPostLoading = () => ({
    type: POST_LOADING,
});

// Clear errors
export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});

// Clear errors
export const clearPosts = () => ({
    type: CLEAR_POSTS,
});

export const clearPost = () => ({
    type: CLEAR_POST,
});

// Add Post
export const addPost = postData => (dispatch) => {
    dispatch(clearErrors());
    axios
        .post("/api/posts", postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data,
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

// Get Posts
export const getPosts = data => (dispatch) => {
    axios
        .post("/api/posts", data)
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: {
                error: err,
            },
        }));
};
export const setPostLoadingAction = () => (dispatch) => {
    dispatch(setPostLoading());
};
// Get Post by ID
export const getPost = id => (dispatch) => {
    axios
        .get(`/api/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: {
                error: err,
            },
        }));
};

// Get Posts by Section
export const getPostsBySection = (section, category) => (dispatch) => {
    axios
        .get(`/api/posts/${section}/${category}`)
        .then(res => dispatch({
            type: GET_POSTS_BY_SECTION,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_POSTS_BY_SECTION,
            payload: {
                error: err,
            },
        }));
};
// Get Posts by Category
export const getPostsByCategory = category => (dispatch) => {
    axios
        .get(`/api/posts/${category}`)
        .then(res => dispatch({
            type: GET_POSTS_BY_CATEGORY,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_POSTS_BY_CATEGORY,
            payload: {
                error: err,
            },
        }));
};

// Get Posts by Category
export const getNewestPostsBySection = section => (dispatch) => {
    axios
        .get(`/api/posts//newestPosts/${section}`)
        .then(res => dispatch({
            type: GET_NEWEST_POSTS_BY_SECTION,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_NEWEST_POSTS_BY_SECTION,
            payload: {
                error: err,
            },
        }));
};

// Delete Post
export const deletePost = id => (dispatch) => {
    axios
        .delete(`/api/posts/${id}`)
        .then(() => dispatch({
            type: DELETE_POST,
            payload: id,
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};
// Add Comment
export const addComment = (postId, commentData) => (dispatch) => {
    dispatch(clearErrors());
    axios
        .post(`/api/posts/comment/${postId}`, commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};

// Delete Comment
export const deleteComment = (postId, commentId) => (dispatch) => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};
