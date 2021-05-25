// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, timeStampParser } from '../Utils';
import { addPost, getPosts } from '../../actions/post';
import { NavLink } from 'react-router-dom';

// Logique de la fonction principale
function NewPostForm() {

    // Constantes useState
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();

    // Store de Redux (Stockage de données + Fournisseur de données)
    const userData = useSelector(state => state.userReducer);
    const error = useSelector(state => state.errorReducer.postErrors);

    // Constante dispatch
    const dispatch = useDispatch();

    // Fonction permettant de créer un post
    const handlePost = async () => {
        // Load spinner pendant le chargement de la publication
        setIsLoading(true);
        // Vérification que la publication n'est pas vide
        if (content || imageUrl || video) {
            // Création d'un objet data
            const data = new FormData();
            data.append('UserId', userData.id);
            data.append('content', content);
            if (file) data.append('file', file);
            data.append('videoUrl', video);

            // Dispatch d'addPost avec l'objet data
            await dispatch(addPost(data));
            // Dispatch getPosts pour récupérer l'id du post
            dispatch(getPosts());
            // Remise du formulaire à zéro
            cancelPost();
            setIsLoading(false);

        } else {
            alert(('Votre publication ne peut pas être vide !'));
            setIsLoading(false);
        }
    };

    // Fonction permettant d'uploader la photo en crééant un fichier "file" pour le passer en "data" et un objet "url" pour l'afficher en prévisualisation
    const handlePicture = (event) => {
        setImageUrl(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
        // Suppression de la vidéo de la publication s'il y en a une
        setVideo('');
    }

    // Fonction permettant de vider le formulaire de publication
    const cancelPost = () => {
        setContent('');
        setImageUrl('');
        setVideo('');
        setFile('');
    };

    // useEffect permettant d'arrêter le state isLoading si le userReducer est rempli avec les informations de l'utilisateur et de prendre en charge la vidéo
    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);

        // Fonction permettant de lire une vidéo en dehors de Youtube
        const handleVideo = () => {
            // Recherche d'un lien youtube dans le texte de publication
            let findLink = content.split(' ');
            for (let i = 0; i < findLink.length; i++) {
                if (
                    findLink[i].includes('https://www.yout') ||
                    findLink[i].includes('https://yout')
                ) {
                    // Remplacement du 'watch?v=' par 'embed/' dans le lien de la vidéo
                    let embed = findLink[i].replace('watch?v=', 'embed/');
                    // Retire le watchtime du lien à partir de '&'
                    setVideo(embed.split('&')[0]);
                    // Suppression du lien de la vidéo du texte de publication
                    findLink.splice(i, 1);
                    setContent(findLink.join(' '));
                    // Suppression de la photo de la publication s'il y en a une
                    setImageUrl('');
                };
            };
        };
        handleVideo();
    }, [userData, content, video])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={userData.pictureUrl} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                            name="content"
                            id="content"
                            placeholder="Faites une publication ici !"
                            onChange={event => setContent(event.target.value)}
                            value={content}
                        />
                        {content || imageUrl || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.pictureUrl} alt="user-pic" />
                                </div>
                                <div className="card-right overflow">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{timeStampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{content}</p>
                                        <img src={imageUrl} alt="" />
                                        {video && (
                                            <iframe
                                                src={video}
                                                frameBorder="0"
                                                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
                                                allowFullScreen
                                                title={video}
                                            ></iframe>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="img" />
                                        <input
                                            type="file"
                                            id="file-upload"
                                            name="file"
                                            accept=".jpg, .jpeg, .png"
                                            onChange={event => handlePicture(event)}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo('')}>Supprimer la vidéo</button>
                                )}
                            </div>
                            {!isEmpty(error.format) && <p>{error.format}</p>}
                            {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
                            {!isEmpty(error.errorContent) && (<p className="error">{error.errorContent}</p>)}
                            <div className="btn-send">
                                {content || imageUrl || video.length > 20 ? (
                                    <button className="cancel" onClick={cancelPost}>
                                        Annuler
                                    </button>
                                ) : null}
                                <button className="send" onClick={handlePost}>
                                    Publier
								</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;