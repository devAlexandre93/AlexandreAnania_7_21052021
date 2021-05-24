// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import axios from 'axios';

// Exports
export const GET_USERS = 'GET_USERS';

// Logique des fonctions 

export const getUsers = () => {
    return (dispatch) => {
        return axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/user`,
			withCredentials: true,
		})
        .then(res => {
            dispatch({ type: GET_USERS, payload: res.data });
        })
        .catch(error => console.log(error));
    };
};