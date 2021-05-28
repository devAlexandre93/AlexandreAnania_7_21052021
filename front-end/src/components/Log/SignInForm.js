// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useState } from 'react';
import axios from 'axios';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonction permettant de se connecter
    const handleLogin = (event) => {
        event.preventDefault();
        const passwordError = document.querySelector(".password.error");

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            }
        })
            .then((res) => {
                // Affichage des erreurs s'il y en a
                if (res.data.errorEmpty || res.data.errorLogin || res.data.errorBrute) {
                    if (res.data.errorEmpty) {passwordError.innerHTML = res.data.errorEmpty}
                    if (res.data.errorLogin) {passwordError.innerHTML = res.data.errorLogin}
                    if (res.data.errorBrute) {passwordError.innerHTML = res.data.errorBrute}
                } else {
                    // Actualisation de la page avec le token reçu
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                name="email"
                id="email"
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
                value={email}
            />
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input
                type="password"
                name="password"
                id="password"
                onChange={(event) => {
                    setPassword(event.target.value)
                }}
                value={password}
            />
            <div className="password error"></div>
            <br />
            <input type="submit" value="Connexion" />
        </form>
    )
}

export default SignInForm
