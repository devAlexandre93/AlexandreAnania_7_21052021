// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import { isEmpty } from '../Utils';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLikes, likePost, unlikePost } from '../../actions/like';
import { getPosts } from '../../actions/post';

function LikeButton({ post, postLikers }) {

    // Constante useState
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Constante permettant de récupérer l'Id de l'utilisateur connecté
    const uid = useContext(UidContext);

    // Constante dispatch
    const dispatch = useDispatch();

    // Store de Redux (Stockage de données + Fournisseur de données)
    const likeData = useSelector(state => state.likeReducer);

    let likeId =
        !isEmpty(likeData[0]) &&
        likeData.map(likesId => {
            return likesId.id;
        });

    const getLikesPosts = () => {
        dispatch(getLikes());
        dispatch(getPosts());
    };

    // Fonction permettant de liker une publication
    const like = async () => {
        setIsLoading(true);
        // Dispatch de likePost avec le post et l'id de l'utilisateur
        await dispatch(likePost(post, uid));
        // Récupèration de l'id du like et la relation dans le post
        getLikesPosts();
        // Passage de liked à true
        setLiked(true);
        setIsLoading(false);
    }

    // Fonction permettant d'unliker une publication
    const unlike = async () => {
        setIsLoading(true);
        // Dispatch d'unlikePost avec le post, l'id de l'utilisateur et l'id du like
        await dispatch(unlikePost(post, uid, likeId));
         // Récupèration de l'id du like et la relation dans le post
         getLikesPosts();
        // Passage de liked à false
        setLiked(false);
        setIsLoading(false);
    };

    // Fonction useEffect
    useEffect(() => {
        if (!isEmpty(postLikers[0]) && postLikers.includes(uid)) {
            setLiked(true);
        } else setLiked(false);
    }, [uid, postLikers, liked]);

    return (
        <>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <div className="like-container">
                    {uid === null && (
                        <Popup
                            trigger={<img src="./img/icons/heart.svg" alt="like" />}
                            position={['bottom center', 'bottom right', 'bottom left']}
                            closeOnDocumentClick
                        >
                            <div>Connectez-vous pour aimer une publication !</div>
                        </Popup>
                    )}
                    {uid && liked === false && (
                        <img
                            src="./img/icons/heart.svg"
                            onClick={like}
                            alt="like"
                            key={likeId}
                        />
                    )}
                    {uid && liked && (
                        <img
                            src="./img/icons/heart-filled.svg"
                            onClick={unlike}
                            alt="unlike"
                            key={likeId}
                        />
                    )}
                    <span>{post.Users.length}</span>
                </div>
            )}
        </>
    )
}

export default LikeButton
