// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post';
import { isEmpty } from './Utils';
import Card from './Post/Card';

function Thread() {

    // Constantes useState
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);

    // Constante dispatch
    const dispatch = useDispatch();

    // Store de Redux (Stockage de données + Fournisseur de données)
    const posts = useSelector((state) => state.postReducer);

    // Fonction qui permet de charger les publications suivantes lorsque l'on arrive à la fin du fil d'atualité
    const loadMore = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop + 1 >
            document.scrollingElement.scrollHeight
        ) {
            setLoadPost(true);
        }
    };

    // Fonction useEffect infinite scoll
    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }
        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);

    return (
        <div className="thread-container">
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map(post => <Card post={post} key={post.id} />)}
            </ul>
        </div>
    );
};

export default Thread
