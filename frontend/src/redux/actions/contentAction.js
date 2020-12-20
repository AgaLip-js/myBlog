import {ADD_CONTENT, EDIT_CONTENT, REMOVE_CONTENT } from "./types";

//return errors
export const addContent = (content) => {
  return {
    type: ADD_CONTENT,
    payload: {
   content: content
    }
  };
};
export const editContent = (newContent) => (dispatch) => {
  dispatch({
    type: EDIT_CONTENT,
    payload: {
      newContent: newContent,
    },
  });
};
export const removeContent = (id) => {
    return {
      type: REMOVE_CONTENT,
      payload: {
         id
        }
    };
  };
