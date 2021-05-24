// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du controller contenant toute la logique métier s'appliquant à l'authentification
// Dans le controller il n'y a que la logique métier
// La logique de routing sera enregistrée dans le dossier routes

const { Users } = require('../models'); // Import du modèle 'Users' créé grâce à la fonction sequelize
const bcrypt = require('bcrypt');
const { verifyUserInput } = require('../middlewares/verifyUserInput'); // Import d'un middleware permettant de vérifier si les champs à remplir sont bien renseignés par les utilisateurs
const { signUpErrors, loginErrors } = require('../utils/errors');
const jwt = require('jsonwebtoken');

// Constantes permettant la création d'un Token
const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    });
};

// Création d'un utilisateur
exports.signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;
    let passwordTrue = verifyUserInput.validPassword(password);

    if (passwordTrue == false) {
        res.status(200).send({ errorPassword: 'Le mot de passe doit contenir entre 6 et 55 caractères !' });
    };

    // Si les champs renseignés sont valides, création de l'utilisateur et hash du mot de passe
    if (passwordTrue == true) {
        bcrypt.hash(password, 10).then(async function (hash) {
            try {
                const user = await Users.create({
                    pseudo,
                    email,
                    password: hash,
                    pictureUrl: "./img/default-user.svg"
                });
                res.status(201).json({ user: user.id });
            }
            catch (error) {
                const errors = signUpErrors(error);
                res.status(200).send({ errors });
            };
        });
    };
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email == '' || password == '') {
        res.status(200).send({ errorEmpty: 'Tous les champs sont obligatoires !' });
    }
    try {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            res.status(200).send({ errorLogin: "Adresse email ou mot de passe incorrect !" });
        }
        await bcrypt
            .compare(password, user.password)
            .then(auth => {
                if (!auth) {
                    res.status(200).send({ errorLogin: "Adresse email ou mot de passe incorrect !" });
                } else {
                    const token = createToken(user.id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge });
                    res.status(200).send({ user: user.id });
                }
            })
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        const errors = loginErrors(error);
        res.status(500).send({ errors });
    }
};

// Déconnexion d'un utilisateur
exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}