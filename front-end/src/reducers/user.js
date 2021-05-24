// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_USER, UPLOAD_PICTURE, UPDATE_BIO, DELETE_USER } from "../actions/user";

// Constante
const initialState = {};

// Export
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload
        case UPLOAD_PICTURE:
            return {
                ...state,
                pictureUrl: action.payload,
            };
        case UPDATE_BIO:
            return {
                ...state,
                bio: action.payload,
            };
        case DELETE_USER:
            return state.filter(user => user.id !== action.payload);

        default:
            return state;
    };
};