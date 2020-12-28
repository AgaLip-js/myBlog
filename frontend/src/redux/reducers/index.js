import { combineReducers } from "redux";
import postReducer from './postReducer';
import authReducer from './authReducer';
import imageReducer from './imageReducer';
import contentReducer from "./contentReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    post: postReducer,
    auth: authReducer,
    image: imageReducer,
    content: contentReducer,
    errors: errorReducer,
});
