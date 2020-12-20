import { ADD_IMAGE, GET_IMAGE, GET_IMAGES, IMAGE_LOADING } from "../actions/types";

const initialState = {
    images: [],
    image: {
    },
    loading: false,
};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GET_IMAGES:
            return {
                ...state,
                images: action.payload,
                loading: false,
            };
        case GET_IMAGE:
            return {
                ...state,
                image: action.payload,
                loading: false,
            };
        case ADD_IMAGE:
            return {
                ...state,
                images: [action.payload, ...state.images],
            };
        default:
            return state;
    }
};

export default imageReducer;
