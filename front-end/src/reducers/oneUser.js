// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_ONE_USER } from "../actions/user";

// Constante
const initialState = {};

// Export
export default function oneUserReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ONE_USER:
			return action.payload;

		default:
			return state;
	}
}