// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

function Logout() {
    // Fonction supprimant le cookie
    const removeCookie = key => {
        if (window !== 'undefined') {
            // Expiration du cookie à 1 ms
            cookie.remove(key, { expires: 1 });
        }
    };

    // Fonction permettant la déconnexion
    const logout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
            .then(() => removeCookie('jwt'))
            .catch(error => console.log(error));

        // Actualisation de la page
        window.location = '/';
    }

    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
    );
};

export default Logout;
