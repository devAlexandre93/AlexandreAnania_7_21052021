// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux';
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user';
import { dateParser, isEmpty  } from '../Utils';
import axios from 'axios';
import cookie from 'js-cookie';

function UpdateProfile() {

    // Constantes useState
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);
    const [password, setPassword] = useState('');

    // Store de Redux (Stockage de données + Fournisseur de données)
    const userData = useSelector((state) => state.userReducer);
    const error = useSelector(state => state.errorReducer.userErrors);

    // Constante dispatch
    const dispatch = useDispatch();

    // Fonction permettant de modifier la bio
    const handleUpdate = () => {
        dispatch(updateBio(userData.id, bio));
        setUpdateForm(false);
    };

    // Fonction permettant de supprimer le compte de l'utilisateur
    const handleDelete = async event => {
        const passwordError = document.querySelector('.password.error');

        // Fonction permettant de supprimer le cookie
        const removeCookie = key => {
            if (window !== 'undefined') {
                cookie.remove(key, { expires: 1 });
            }
        };

        // Méthode delete avec l'id de l'utilisateur en params et le password en data
        await axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/user/${userData.id}`,
            data: { password },
            withCredentials: true,
        })
            .then(async function (res) {
                // Gestion des erreurs
                if (res.data.errorPassword) {
                    passwordError.innerHTML = res.data.errorPassword;
                } else {
                    // Méthode get déconnectant l'utilisateur et supprimant le cookie
                    await axios({
                        method: 'get',
                        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
                        withCredentials: true,
                    })
                        // on supprime le cookie jwt
                        .then(() => removeCookie('jwt'))
                        .catch(error => console.log(error));

                    // on actualise la page
                    window.location = '/';
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>{userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.pictureUrl} alt="user-pic" />
                    <UploadImg />
                    <p>{error.maxSize}</p>
					<p>{error.format}</p>
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>À propos de moi </h3>
                        {updateForm === false && (
                            <>
                                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => setUpdateForm(!updateForm)}> Modifier </button>
                            </>
                        )}
                        {updateForm && (
                            <>
                                <textarea
                                    type="text"
                                    defaultValue={userData.bio}
                                    onChange={(event) => setBio(event.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>Valider les modifications</button>
                            </>
                        )}
                        {!isEmpty(error.errorBio) && (<p className="error">{error.errorBio}</p>)}
                    </div>
                    <h4>Membre depuis le {dateParser(userData.createdAt)}</h4>
                    {deleteForm === false && (
                        <>
                            <button className="delete" onClick={() => setDeleteForm(!deleteForm)}>
                                Supprimer le compte
							</button>
                        </>
                    )}
                    {deleteForm && (
                        <>
                            <div className="form-password">
                                <label htmlFor="password">Veuillez entrer votre mot de passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={event => setPassword(event.target.value)}
                                    value={password}
                                />
                                <div className="password error"></div>
                                <button
                                    className="delete"
									onClick={() => {
										if (
											window.confirm(
												'Voulez-vous vraiment supprimer votre compte ?',
											)
										) {
											handleDelete();
										}
									}}
								>
									Valider la suppression
								</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile
