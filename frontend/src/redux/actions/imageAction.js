import axios from 'axios';

import {
ADD_IMAGE,
GET_IMAGE,
GET_ERRORS,
IMAGE_LOADING,
GET_IMAGES
} from './types';

  // Get Image
  export const getImage = name => dispatch => {
    dispatch(setImageLoading());
    axios
      .get(`/files/:${name}`)
      .then(res =>
        dispatch({
          type: GET_IMAGE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_IMAGE,
          payload: null
        })
      );
  };

  //Get images
  export const getImages =()=> dispatch => {
    dispatch(setImageLoading());
    axios
      .get(`/files`)
      .then(res =>
        dispatch({
          type: GET_IMAGES,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_IMAGES,
          payload: null
        })
      );
  };

  // Add Image
  export const addImage = uploadData => dispatch => {
    axios
      .post('/upload', uploadData)
      .then(res =>
        dispatch({
          type: ADD_IMAGE,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

    // Set loading state
    export const setImageLoading = () => {
        return {
          type: IMAGE_LOADING
        };
      };
