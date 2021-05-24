// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import { combineReducers } from 'redux';
import userReducer from './user';
import oneUserReducer from './oneUser';
import usersReducer from './users';
import postReducer from './post';
import allPostsReducer from './allPosts';
import likeReducer from './like';
import onePostReducer from './onePost';
import commentReducer from './comment';
import trendingReducer from './trending';
import errorReducer from './error';

// Export
export default combineReducers({
    userReducer,
    oneUserReducer,
    usersReducer,
    postReducer,
    onePostReducer,
    allPostsReducer,
    likeReducer,
    commentReducer,
    trendingReducer,
    errorReducer
})