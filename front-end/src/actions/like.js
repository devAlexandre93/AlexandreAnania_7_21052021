// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Import
import axios from 'axios';

// Exports
export const GET_LIKES = 'GET_LIKES';
export const LIKE_POST = 'LIKE_POST';
export const UNLIKE_POST = 'UNLIKE_POST';

// Logique des fonctions 

// GET_LIKES
export const getLikes = () => {
	return dispatch => {
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_API_URL}api/rate/getlikes`,
			withCredentials: true,
		})
			.then(res => {
				dispatch({ type: GET_LIKES, payload: res.data });
			})
			.catch(err => console.log(err));
	};
};

// LIKE_POST
export const likePost = (post, uid) => {
    return dispatch => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/rate/${post.id}/likepost/${uid}`,
            withCredentials: true,
        });
    };
};

// UNLIKE_POST
export const unlikePost = (post, uid) => {
    let postId = post.id;
    return dispatch => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/rate/${post.id}/unlikepost/${uid}`,
            withCredentials: true,
        })
            .then((res) => {
                dispatch({ type: UNLIKE_POST, payload: { postId, uid } });
            })
            .catch(error => console.log(error));
    };
};