// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Import
import axios from 'axios';

// Exports
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Logique des fonctions 

// GET_COMMENTS
export const getComments = () => {
    return dispatch => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/comment/getcomments`,
            withCredentials: true,
        })
            .then(res => {
                dispatch({ type: GET_COMMENTS, payload: res.data });
            })
            .catch(err => console.log(err));
    };
};

// ADD_COMMENT
export const addComment = (post, userData, content) => {
    let commenterPseudo = userData.pseudo;
    let postId = post.id;
    return dispatch => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/comment/${postId}/commentpost/${userData.id}`,
            data: { content, commenterPseudo },
            withCredentials: true,
        })
            .then(res => {
                dispatch({ type: ADD_COMMENT, payload: postId });
            })
            .catch(error => console.log(error));
    };
};

// UPDATE_COMMENT
export const updateComment = (commentId, content) => {
    return dispatch => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/comment/editcomment/${commentId}`,
            data: { content },
            withCredentials: true,
        })
            .then(res => {
                dispatch({ type: UPDATE_COMMENT, payload: { commentId, content } });
            })
            .catch(err => console.log(err));
    };
};

// DELETE_COMMENT
export const deleteComment = (commentId) => {
    return dispatch => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/comment/deletecomment/${commentId}`,
            withCredentials: true,
        })
            .then(res => {
                dispatch({ type: DELETE_COMMENT, payload: { commentId } });
            })
            .catch(err => console.log(err));
    };
};