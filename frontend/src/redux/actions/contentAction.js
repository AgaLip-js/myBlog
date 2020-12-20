import { ADD_CONTENT, EDIT_CONTENT, REMOVE_CONTENT } from "./types";

// return errors
export const addContent = content => ({
    type: ADD_CONTENT,
    payload: {
        content,
    },
});
export const editContent = newContent => (dispatch) => {
    dispatch({
        type: EDIT_CONTENT,
        payload: {
            newContent,
        },
    });
};
export const removeContent = id => ({
    type: REMOVE_CONTENT,
    payload: {
        id,
    },
});
