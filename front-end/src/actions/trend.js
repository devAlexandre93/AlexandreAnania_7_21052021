// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Exports
export const GET_TRENDS = 'GET_TRENDS';

// Logique des fonctions 

// GET_TRENDS
export const getTrends = (sortedArray) => {
	return dispatch => {
		dispatch({ type: GET_TRENDS, payload: sortedArray });
	};
};