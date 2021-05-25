// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du controller contenant toute la logique métier s'appliquant aux utilisateurs
// Dans le controller il n'y a que la logique métier
// La logique de routing sera enregistrée dans le dossier routes

const { Users } = require('../models'); // Import du modèle 'Users' créé grâce à la fonction sequelize
const { verifyUserInput } = require('../middlewares/verifyUserInput'); // Import d'un middleware permettant de vérifier si les champs à remplir sont bien renseignés par les utilisateurs
const bcrypt = require('bcrypt');
const fs = require('fs');

// Obtenir les utilisateurs
exports.getAllUsers = async (req, res) => {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
};

// Obtenir un utilisateur
exports.getOneUser = async (req, res) => {
    try {
        const user = await Users.findOne({
            attributes: { exclude: ['password'] },
            where: { id: req.params.id },
        });
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(400).send({ error: "L'Utilisateur avec l'id numéro " + req.params.id + " est introuvable !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
    let bio = req.body.bio;
    let bioTrue = verifyUserInput.validBio(bio);

    // Vérification du champs renseigné par l'utilisateur
    if (bioTrue == false) {
        res.status(200).send({
            errors: {
                errorBio:
                    "La description doit contenir 150 caractères au maximum !",
            },
        });
        res.status(400).send({ error: 'error' });
    }

    // Si le champs renseigné est valide, modification de la description
    if (bioTrue == true) {
        try {
            const user = await Users.findOne({
                attributes: ['bio', 'id'],
                where: { id: req.params.id },
            });
            await user
                .update({
                    bio: bio,
                })
                .then(res.status(201).send({ message: 'La description a été modifié !' }))
                .catch(error => res.status(400).send(error));
        } catch (error) {
            res.status(500).send({ error });
        }
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    const password = req.body.password;
    const user = await Users.findOne({ where: { id: req.params.id } });
    let fileName = user.dataValues.pictureUrl.split('/uploads/profile')[1];

    try {
        if (!user) {
            res.status(400).send({ error: "L'Utilisateur avec l'id numéro " + req.params.id + " est introuvable !" });
        }
        // Vérification de la suppression avec le mot de passe de l'utilisateur
        await bcrypt
            .compare(password, user.password)
            .then(auth => {
                if (!auth) {
                    res.status(200).json({ errorPassword: 'Mot de passe incorrect !' });
                } else {
                    user
                        .destroy()
                        .then(
                            res.status(200).send({
                                message: "L'Utilisateur avec l'id " + req.params.id + ' a été supprimé !',

                            }),
                        )
                        .catch(error => res.status(400).send({ error }));

                    // Supression de la photo de profil de l'utilisateur si ce n'est pas celle par défaut
                    fs.unlink(
                        `${__dirname}/../../front-end/public/uploads/profile/${fileName}`,
                        function (error) {
                            if (error) {
                                console.log('Aucune photo de profil trouvée !');
                            }
                        },
                    );
                }
            })
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        res.status(500).send({ error });
    }
};
