import axios from "axios";
import { ADD_IMAGE, GET_ERRORS, GET_IMAGE, GET_IMAGES, IMAGE_LOADING } from "./types";

// Set loading state
export const setImageLoading = () => ({
    type: IMAGE_LOADING,
});

// Get Image
export const getImage = name => (dispatch) => {
    dispatch(setImageLoading());
    axios
        .get(`/files/:${name}`)
        .then(res => dispatch({
            type: GET_IMAGE,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_IMAGE,
            payload: {
                error: err,
            },
        }));
};

// Get images
export const getImages = () => (dispatch) => {
    dispatch(setImageLoading());
    axios
        .get(`/files`)
        .then(res => dispatch({
            type: GET_IMAGES,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_IMAGES,
            payload: {
                error: err,
            },
        }));
};

// Add Image
export const addImage = uploadData => (dispatch) => {
    axios
        .post("/upload", uploadData)
        .then(res => dispatch({
            type: ADD_IMAGE,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
        }));
};
