// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, updateComment } from '../../actions/comment';
import { UidContext } from '../AppContext';

// Logique de la fonction principale
function EditDeleteComment({ comment, post }) {

    // Constantes useState
    const [isAuthor, setIsAuthor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [content, setContent] = useState('');

    // Constante permettant de récupérer l'Id de l'utilisateur connecté
    const uid = useContext(UidContext);

    // Store de Redux (Stockage de données + Fournisseur de données)
    const userData = useSelector(state => state.userReducer);

    // Constante dispatch
    const dispatch = useDispatch();

    // Déclarations
    let commentId = comment.id;
    let postId = post.id;

    // Fonction permettant de modifier un commentaire
    const handleEdit = event => {
        setIsLoading(true)
        event.preventDefault();
        // Dispacth d'updateComment avec l'id du commentaire et le nouveau commentaire
        if (content) dispatch(updateComment(commentId, content));
        setIsLoading(false)
    };

    // Fonction permettant de supprimer un commentaire
    const handleDelete = () => {
        setIsLoading(true)
        // Dispatch deleteComment avec l'id du commentaire et l'id du post pour le store
        dispatch(deleteComment(commentId, postId));
        setIsLoading(false)
    };

    // useEffect permettant de vérifier l'id de l'utilisateur en ligne avec l'userId des commentaires
    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.userId) {
                setIsAuthor(true);
            } else setIsAuthor(false);
        };
        checkAuthor();
    }, [uid, comment.userId]);

    return (
        <>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <div className="edit-comment">
                    {isAuthor && edit === false && (
                        <span onClick={() => setEdit(!edit)}>
                            <img src="./img/icons/edit.svg" alt="edit-comment" />
                        </span>
                    )}
                    {isAuthor && edit && (
                        <form action="" onSubmit={handleEdit} className="edit-comment-form">
                            <label htmlFor="text" onClick={() => setEdit(!edit)}>
                                Modifications terminées
                            </label>
                            <br />
                            <input
                                type="text"
                                name="content"
                                onChange={event => setContent(event.target.value)}
                                defaultValue={comment.content}
                            />
                            <br />
                            <div className="btn">
                                <span
                                    onClick={() => {
                                        if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
                                            handleDelete();
                                        }
                                    }}
                                >
                                    <img src="./img/icons/trash.svg" alt="delete" />
                                </span>
                                <input type="submit"  value="Valider les modifications" />
                            </div>
                        </form>
                    )}
                </div>
            )}
        </>
    );
};

// Export
export default EditDeleteComment;