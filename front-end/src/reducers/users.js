// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_USERS } from "../actions/users";

// Constante
const initialState = {};

// Export
export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			return action.payload;
		default:
			return state;
	}
}