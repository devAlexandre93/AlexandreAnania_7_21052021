// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParserPost, isEmpty } from '../Utils';
import { deletePost, updatePost } from '../../actions/post';
import LikeButton from './LikeButton';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { addComment, getComments } from '../../actions/comment';
import EditDeleteComment from './EditDeleteComment';

const Card = ({ post }) => {

    // Constantes useState
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const [commentsContent, setCommentsContent] = useState('');

    // Constante permettant de récupérer l'Id de l'utilisateur connecté
    const uid = useContext(UidContext);

    // Store de Redux (Stockage de données + Fournisseur de données)
    const userData = useSelector(state => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const commentData = useSelector(state => state.commentReducer);

    // Constante dispatch
    const dispatch = useDispatch();

    // Fonction permettant d'actualiser une publication
    const updateItem = async () => {
        if (textUpdate) {
            await dispatch(updatePost(post.id, textUpdate));
        }
        setIsUpdated(false);
    };

    // Fonction qui permet de supprimer une publication
    const deleteQuote = () => {
        setIsLoading(true);
        dispatch(deletePost(post.id));
        setIsLoading(false);
    };

    // Fonction useEffect qui passe le loading sur false si le store usersData n'est pas vide
    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData]);

    // Fonction permettant de créer un commentaire
    const handleComment = async (event) => {
        event.preventDefault();
        // Contrôle que le champs est bien rempli
        if (commentsContent) {
            // Dispatch d'addComment avec le post, l'utilisateur et le commentaire
            await dispatch(addComment(post, userData, commentsContent));
            // Dispacth de getComments pour récupérer l'id du commentaire et l'afficher instantanément
            dispatch(getComments());
            // Le champs est remis à zéro
            setCommentsContent('');
            // Si le champs n'est pas rempli, on le signale à l'utilisateur
        } else {
            alert('Votre commentaire ne peut pas être vide !');
        }
    };

    return (
        <li className="card-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img
                            src={
                                !isEmpty(usersData[0]) &&
                                usersData.map(user => {
                                    if (user.id === post.UserId) return user.pictureUrl;
                                    else return null;
                                })
                                    .join('')
                            }
                            alt="poster-pic"
                        />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map(user => {
                                            if (user.id === post.UserId) return user.pseudo;
                                            else return null;
                                        })}
                                </h3>
                            </div>
                            <span>{dateParserPost(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.content}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea
                                    defaultValue={post.content}
                                    onChange={event => setTextUpdate(event.target.value)}
                                />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>
                                        Valider les modifications
									</button>
                                </div>
                            </div>
                        )}
                        {post.imageUrl && (
                            <img src={post.imageUrl} alt="card-pic" className="card-pic" />
                        )}
                        {post.videoUrl && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.videoUrl}
                                frameBorder="0"
                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
                                allowFullScreen
                                title={post.id}
                            ></iframe>
                        )}
                        {userData.id === post.UserId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                                <div
                                    onClick={() => {
                                        if (window.confirm('Voulez-vous vraiment supprimer cette publication ?')) {
                                            deleteQuote();
                                        }
                                    }}
                                >
                                    <img src="./img/icons/trash.svg" alt="trash" />
                                </div>
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                {uid === null && (
                                    <Popup
                                        trigger={<img src="./img/icons/message1.svg" alt="like" />}
                                        position={['bottom center', 'bottom right', 'bottom left']}
                                        closeOnDocumentClick
                                    >
                                        <div>Connectez-vous pour commenter une publication !</div>
                                    </Popup>
                                )}
                                {uid && (
                                    <img
                                        onClick={() => setShowComments(!showComments)}
                                        src="./img/icons/message1.svg"
                                        alt="comments"
                                    />
                                )}
                            </div>
                            <LikeButton
                                post={post}
                                postLikers={
                                    !isEmpty(post.Users[0]) &&
                                    post.Users.map(likersId => {
                                        if (likersId.Likes) return likersId.Likes.userId;
                                        else return null;
                                    })
                                }
                            />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {showComments &&
                            <div className="comments-container">
                                {!isEmpty(commentData[0]) &&
                                    commentData.map(comment => {
                                        if (comment.postId === post.id) {
                                            return (
                                                <div
                                                    className={
                                                        comment.userId === userData.id
                                                            ? 'comment-container client'
                                                            : 'comment-container'
                                                    }
                                                    key={comment.id}
                                                >
                                                    <div className="letf-part">
                                                        <img
                                                            src={
                                                                !isEmpty(usersData[0]) &&
                                                                usersData
                                                                    .map(user => {
                                                                        if (user.id === comment.userId)
                                                                            return user.pictureUrl;
                                                                        else return null;
                                                                    })
                                                                    .join('')
                                                            }
                                                            alt="commenter-pic"
                                                        />
                                                    </div>

                                                    <div className="right-part">
                                                        <div className="comment-header">
                                                            <div className="pseudo">
                                                                <h3>{comment.commenterPseudo}</h3>
                                                            </div>
                                                            <span>{dateParserPost(comment.updatedAt)}</span>
                                                        </div>

                                                        <p>{comment.content}</p>
                                                    </div>
                                                    <span></span>
                                                    <EditDeleteComment comment={comment} post={post} />
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                {userData.id && (
                                    <form action="" onSubmit={handleComment} className="comment-form">
                                        <input
                                            type="text"
                                            id="content"
                                            name="content"
                                            onChange={event => setCommentsContent(event.target.value)}
                                            value={commentsContent}
                                            placeholder="Laissez un commentaire ici !"
                                        />
                                        <br />
                                        <input type="submit" value="Commenter" />
                                    </form>
                                )}
                            </div>
                        }
                    </div>
                </>
            )}
        </li>
    )
}

// Export
export default Card
