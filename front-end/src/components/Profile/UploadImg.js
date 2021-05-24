// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, uploadPicture } from '../../actions/user';

function UploadImg() {
    
    // Constante useState
    const [file, setFile] = useState();

    // Constante dispatch
    const dispatch = useDispatch();

    // Store de Redux (Stockage de données + Fournisseur de données)
    const userData = useSelector(state => state.userReducer);

    // Fonction permettant de changer la photo de profil
    const handlePicture = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData.id);
        data.append('file', file);

        // Dispatch d'uploadPicture avec l'objet et l'id de l'utilisateur et mise à jour du Store
        dispatch(uploadPicture(data, userData.id));
        dispatch(getUser());
    };

    return (
        <form action="" onSubmit={handlePicture} className="upload-pic">
            <label htmlFor="file">Choisir une photo de profil</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(event) => setFile(event.target.files[0])}
            />
            <br />
            <input type="submit" value="Changer la photo" />
        </form>
    )
}

export default UploadImg
