// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du controller contenant toute la logique métier s'appliquant aux likes
// Dans le controller il n'y a que la logique métier
// La logique de routing sera enregistrée dans le dossier routes

const { Likes } = require('../models'); // Import du modèle 'Likes' créé grâce à la fonction sequelize

// Liker une publication
exports.likePost = async (req, res) => {
    try {
        let userId = req.params.liker;
        let postId = req.params.id;
        await Likes.create({
            postId: postId,
            userId: userId,
        })
            .then(like => res.status(201).send({ like }))
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Unliker une publication
exports.unlikePost = async (req, res) => {
    try {
        let userId = req.params.liker;
        let postId = req.params.id;
        await Likes.destroy({
            where: { userId: userId, postId: postId },
        })
            .then(res.status(200).send({ message: 'Le like a été retiré !' }))
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Obtenir tout les likes
exports.getLikes = async (req, res) => {
    try {
        const likes = await Likes.findAll({
            attributes: ['id', 'userId', 'postId'],
        });
        if (likes > []) {
            res.status(200).send(likes);
        } else {
            res.status(200).send({ error: "Il n'y a pas de like pour le moment !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};
