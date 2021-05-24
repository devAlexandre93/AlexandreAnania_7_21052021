// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/post";
import { UNLIKE_POST } from '../actions/like';

// Constante
const initialState = {};

// Export
export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case UNLIKE_POST:
            return state.map(post => {
                if (post.id === action.payload.postId) {
                    const Users = post.Users.filter(
                        u =>
                            u.Like.userId !== action.payload.uid &&
                            u.Like.postid !== action.payload.postId,
                    );
                    const resultPost = { ...post, Users };
                    if (!resultPost.Users.length) delete resultPost.Users.Like;
                    return resultPost;
                } else return post;
            });
        case UPDATE_POST:
            return state.map(post => {
                if (post.id === action.payload.postId) {
                    return {
                        ...post,
                        content: action.payload.content,
                    };
                } else return post;
            });
        case DELETE_POST:
            return state.filter(post => post.id !== action.payload.postId);
        default:
            return state;
    }
}