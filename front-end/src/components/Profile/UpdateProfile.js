// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React from 'react';
import LeftNav from '../LeftNav';
import { useSelector } from 'react-redux';

function UpdateProfile() {

    // Store de Redux (Stockage de données + Fournisseur de données)
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>{userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.pictureUrl} alt="user-pic" />
                    Upload pic
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile
