import axios from "axios";
import { returnErrors } from "./errorAction";
import { ADD_POST, CLEAR_ERRORS, DELETE_POST, GET_ERRORS, GET_POST, GET_POSTS, POST_LOADING } from "./types";

// Set loading state
export const setPostLoading = () => ({
    type: POST_LOADING,
});

// Clear errors
export const clearErrors = () => ({
    type: CLEAR_ERRORS,
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
export const getPosts = () => (dispatch) => {
    axios
        .get("/api/posts")
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
// Get Post
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
