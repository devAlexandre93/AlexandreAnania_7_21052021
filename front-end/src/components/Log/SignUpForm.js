// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from "./SignInForm";

function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const pseudoError = document.querySelector('.pseudo.error');
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        const passwordConfirmError = document.querySelector('.password-confirm.error');
        const terms = document.getElementById('terms');
        const termsError = document.querySelector('.terms.error');

        // Injection de "texte vide" pour rafraichir les erreurs à chaque validation du formulaire
        pseudoError.innerHTML = '';
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        passwordConfirmError.innerHTML = '';
        termsError.innerHTML = '';

        // Gestion des erreurs : les 2 mots de passe doivent correpondre et les GC doivent être acceptées
        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword)
                passwordConfirmError.innerHTML = 'Les mots de passe ne correspondent pas !';
            if (!terms.checked)
                termsError.innerHTML = 'Veuillez accepter les conditions générales !';
        } else {
            // Méthode Post via 'axios'
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/user/signup`,
                data: {
                    pseudo,
                    email,
                    password,
                },
            })
                .then((res) => {
                    // Gestion des erreurs
                    if (res.data.errorPassword || res.data.errors) {
                        if (res.data.errorPassword) { passwordError.innerHTML = res.data.errorPassword };
                        if (res.data.errors) {
                            pseudoError.innerHTML = res.data.errors.pseudo;
                            emailError.innerHTML = res.data.errors.email;
                        }
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => console.log(err))
        }
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <span></span>
                    <h4 className="success"> Inscription réussie ! Vous pouvez désormais vous connecter </h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="pseudo">Nom d'utilisateur</label>
                    <br />
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        onChange={(event) => setPseudo(event.target.value)}
                        value={pseudo}
                    />
                    <div className="pseudo error"></div>
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                    />
                    <div className="email error"></div>
                    <br />
                    <label htmlFor="password">Mot de Passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                    />
                    <div className="password error"></div>
                    <br />
                    <label htmlFor="password-conf">Confirmation du mot de Passe</label>
                    <br />
                    <input
                        type="password"
                        name="password"
                        id="password-conf"
                        onChange={(event) => setControlPassword(event.target.value)}
                        value={controlPassword}
                    />
                    <div className="password-confirm error"></div>
                    <br />
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                        {' '}J'accepte les{' '}<a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a>
                    </label>
                    <div className="terms error"></div>
                    <br />
                    <input type="submit" value="Inscription" />
                </form>
            )}
        </>
    );
};

export default SignUpForm;
