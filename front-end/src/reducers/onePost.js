// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_ONE_POST } from '../actions/post';

// Constante
const initialState = {};

// Export
export default function onePostReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ONE_POST:
			return action.payload;
		default:
			return state;
	}
}