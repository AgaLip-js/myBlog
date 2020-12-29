import axios from "axios";
import { CATEGORY_LOADING, GET_CATEGORY } from "./types";

// Set loading state
export const setCategoryLoading = () => ({
    type: CATEGORY_LOADING,
});
export const setCategoryLoadingAction = () => (dispatch) => {
    dispatch(setCategoryLoading());
};
// Get Posts
export const getCategory = () => (dispatch) => {
    axios
        .get("/api/category")
        .then(res => dispatch({
            type: GET_CATEGORY,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_CATEGORY,
            payload: {
                error: err,
            },
        }));
};
