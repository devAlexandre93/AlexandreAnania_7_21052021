// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_USER } from "../actions/user";

const initialState = {};

// Export
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload

        default:
            return state;
    };
};