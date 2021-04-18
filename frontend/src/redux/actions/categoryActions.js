import axios from "axios";
import { CATEGORY_LOADING, GET_ALL_CATEGORIES, GET_CATEGORY_FOR_SECTION } from "./types";

// Set loading state
export const setCategoryLoading = () => ({
    type: CATEGORY_LOADING,
});
export const setCategoryLoadingAction = () => (dispatch) => {
    dispatch(setCategoryLoading());
};

// Get Category
export const getAllCategories = () => (dispatch) => {
    axios
        .get("/api/category/categories")
        .then(res => dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {
                categories: res.data,
            },
        }))
        .catch(err => dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {
                error: err,
            },
        }));
};

// Get Category for section
export const getCategoryForSection = section => (dispatch) => {
    axios
        .get(`/api/category/${section}`)
        .then(res => dispatch({
            type: GET_CATEGORY_FOR_SECTION,
            payload: res.data,
        }))
        .catch(err => dispatch({
            type: GET_CATEGORY_FOR_SECTION,
            payload: {
                error: err,
            },
        }));
};
