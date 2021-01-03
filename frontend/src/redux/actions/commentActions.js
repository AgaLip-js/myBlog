import axios from "axios";

export const ADD_NEW_COMMENT = "ADD_NEW_COMMENT";
export const ADD_NEW_COMMENT_FAILED = "ADD_NEW_COMMENT_FAILED";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const DELETE_COMMENT_FAILED = "DELETE_COMMENT_FAILED";
export const GET_ALL_COMMENTS = "GET_ALL_COMMENTS";
export const GET_ALL_COMMENTS_FAILED = "GET_ALL_COMMENTS_FAILED";
export const ADD_NEW_REPLY = "ADD_NEW_REPLY";
export const ADD_NEW_REPLY_FAILED = "ADD_NEW_REPLY_FAILED";
export const ADD_REACTION = "ADD_REACTION";
export const ADD_REACTION_FAILED = "ADD_REACTION_FAILED";

// Add Comment
export const addComment = (postId, commentData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/posts/${postId}/comment`, commentData);
        dispatch({
            type: ADD_NEW_COMMENT,
            payload: {
                comment: data,
            },
        });
    } catch (err) {
        dispatch({
            type: ADD_NEW_COMMENT_FAILED,
            payload: err.response.data,
        });
    }
};

// Add Reply
export const addReply = (postId, commentId, replyData) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/posts/${postId}/comment/${commentId}`, replyData);
        dispatch({
            type: ADD_NEW_REPLY,
            payload: {
                commentId,
                comment: data,
            },
        });
    } catch (err) {
        dispatch({
            type: ADD_NEW_COMMENT_FAILED,
            payload: err.response.data,
        });
    }
};

// Get Comments
export const getComments = postId => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/posts/${postId}/comments`);

        dispatch({
            type: GET_ALL_COMMENTS,
            payload: {
                comments: data.comments,
            },
        });
    } catch (err) {
        dispatch({
            type: GET_ALL_COMMENTS_FAILED,
            payload: err.response.data,
        });
    }
};

// Add Reaction
export const addReactionAction = (commentId, reactionName) => async (dispatch) => {
    try {
        const { data } = await axios.post(`/api/posts/reaction/${commentId}`, {
            reactionName,
        });
        dispatch({
            type: ADD_REACTION,
            payload: {
                comment: data,
            },
        });
    } catch (err) {
        dispatch({
            type: ADD_REACTION_FAILED,
            payload: err.response.data,
        });
    }
};

// Delete Comment
export const deleteComment = (postId, commentId) => (dispatch) => {
    axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res => dispatch({
            type: DELETE_COMMENT,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: DELETE_COMMENT_FAILED,
            payload: err.response.data,
        }));
};
