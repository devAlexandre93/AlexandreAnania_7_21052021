// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { GET_TRENDS } from '../actions/trend';

// Constante
const initialState = {};

// Export
export default function trendingReducer(state = initialState, action) {
	switch (action.type) {
		case GET_TRENDS:
			return action.payload;
		default:
			return state;
	}
}