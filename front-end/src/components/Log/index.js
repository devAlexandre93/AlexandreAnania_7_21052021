// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Imports
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

const Log = props => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [signInModal, setSignInModal] = useState(props.signin);

    // Fonction-évènement permettant d'afficher le formulaire pour l'inscription ou la connexion
    const handleModals = (event) => {
        // Lorsqu'on clique sur Inscription
        if (event.target.id === 'register') {
            setSignInModal(false);
            setSignUpModal(true);
        // Lorsqu'on clique sur Connexion
        } else if (event.target.id === 'login') {
            setSignUpModal(false);
            setSignInModal(true);
        }
    };

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        onClick={handleModals}
                        id="register"
                        className={signUpModal ? "active-btn" : null}
                    >
                        Inscription
                    </li>
                    <li
                        onClick={handleModals}
                        id="login"
                        className={signInModal ? "active-btn" : null}
                    >
                        Connexion
                    </li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    )
}

export default Log
