// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import axios from 'axios';

// Exports
export const GET_USER = 'GET_USER';

// Logique des fonctions 
export const getUser = (uid) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
            withCredentials: true,
        })
            .then(res => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch((error) => console.log(error))
    };
};