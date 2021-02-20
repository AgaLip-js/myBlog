import axios from "axios";
import { returnErrors } from "./errorAction";
import { ADD_IMAGE, GET_IMAGE, GET_IMAGES, IMAGE_LOADING } from "./types";

// Set loading state
export const setImageLoading = () => ({
    type: IMAGE_LOADING,
});

// Get Image
export const getImage = name => (dispatch) => {
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
export const setImageLoadingAction = () => (dispatch) => {
    dispatch(setImageLoading());
};

// Get images
export const getImages = () => (dispatch) => {
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
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};
