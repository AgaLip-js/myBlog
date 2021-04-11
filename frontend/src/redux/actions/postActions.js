import axios from "axios";
import { returnErrors } from "./errorAction";
import { ADD_POST, CLEAR_ERRORS, DELETE_POST, GET_ERRORS, GET_POST, POST_LOADING,
    GET_POSTS_BY_SECTION_AND_CATEGORY, GET_MORE_POSTS_BY_CATEGORY, GET_NEWEST_POSTS_BY_SECTION, CLEAR_POSTS, CLEAR_POST, SEARCH_POSTS, EDIT_POST, GET_POSTS, POST_LOADING_MORE } from "./types";

// Set loading state
export const setPostLoading = () => ({
    type: POST_LOADING,
});

// Set loading state for load more
export const setLoadingMore = () => ({
    type: POST_LOADING_MORE,
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

export const setPostLoadingAction = () => (dispatch) => {
    dispatch(setPostLoading());
};

export const setPostLoadingMore = () => (dispatch) => {
    dispatch(setLoadingMore());
};

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

export const editPost = (id, newPost) => (dispatch) => {
    const editedPost = {
        title: newPost.title,
        category: newPost.category,
        quantity: newPost.quantity,
        date: newPost.date,
        type: newPost.type,
        id,
    };
    axios
        .put(`/api/posts${id}`, editedPost)
        .then(() => {
            dispatch({
                type: EDIT_POST,
                payload: {
                    editedPost,
                },
            });
        })
        .catch(err => dispatch({
            type: EDIT_POST,
            payload: {
                error: err,
            },
        }));
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
export const getPostsBySectionAndCategory = (section, category, data) => (dispatch) => {
    axios
        .post(`/api/posts/${section}/${category}`, data)
        .then(res => dispatch({
            type: GET_POSTS_BY_SECTION_AND_CATEGORY,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_POSTS_BY_SECTION_AND_CATEGORY,
            payload: {
                error: err,
            },
        }));
};
// // Get Posts by Category
// export const getPostsByCategory = (category, data) => (dispatch) => {
//     axios
//         .post(`/api/posts/${category}`, data)
//         .then(res => dispatch({
//             type: GET_POSTS_BY_CATEGORY,
//             payload: res.data,
//         }))
//         .catch(err => dispatch({
//             type: GET_POSTS_BY_CATEGORY,
//             payload: {
//                 error: err,
//             },
//         }));
// };

// Get Newest Posts by Section
export const getNewestPostsBySection = section => (dispatch) => {
    axios
        .get(`/api/posts/newestPosts/${section}`)
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

// Get Newest Posts by Section
export const getMorePostsByCategory = category => (dispatch) => {
    axios
        .get(`/api/posts/morePosts/${category}`)
        .then(res => dispatch({
            type: GET_MORE_POSTS_BY_CATEGORY,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_MORE_POSTS_BY_CATEGORY,
            payload: {
                error: err,
            },
        }));
};

// Search Posts
export const searchPosts = (matchWord, data) => (dispatch) => {
    console.log(matchWord);
    axios
        .post(`/api/posts/search/?query=${matchWord}`, data)
        .then(res => dispatch({
            type: SEARCH_POSTS,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: SEARCH_POSTS,
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
