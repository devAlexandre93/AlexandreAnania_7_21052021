// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Import
import { GET_ALL_POSTS } from '../actions/post';

// Constante
const initialState = {};

// Export
export default function allPostsReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_POSTS:
			return action.payload;
		default:
			return state;
	}
}