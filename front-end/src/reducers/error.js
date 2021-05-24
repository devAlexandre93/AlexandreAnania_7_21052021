// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_POST_ERRORS } from "../actions/post";
import { GET_USER_ERRORS } from '../actions/user';

// Constante
const initialState = { postErrors: [], userErrors: [] };

// Export
export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_ERRORS:
            return {
                postErrors: action.payload,
                userErrors: [],
            }
        case GET_USER_ERRORS:
            return {
                userErrors: action.payload,
                postErrors: [],
            };
        default:
            return state;
    }
}