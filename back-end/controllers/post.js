// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du controller contenant toute la logique métier s'appliquant aux publications
// Dans le controller il n'y a que la logique métier
// La logique de routing sera enregistrée dans le dossier routes

const { Users, Posts } = require('../models'); // Import des modèles 'Users' et 'Posts créés grâce à la fonction sequelize
const { verifyUserInput } = require('../middlewares/verifyUserInput'); // Import d'un middleware permettant de vérifier si les champs à remplir sont bien renseignés par les utilisateurs
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors'); // Import permettant de gérer les erreurs

// Obtenir toutes les publications
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Users,
                    attributes: ['pseudo'],
                },
            ],
        });
        if (posts > []) {
            res.status(201).send(posts);
        } else {
            res.status(404).send({ error: "Il n'y a pas de publication pour le moment !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Obtenir une publication
exports.getOnePost = async (req, res) => {
    let postId = req.params.id;
    try {
        const post = await Posts.findOne({
            include: [
                {
                    model: Users,
                    attributes: ['pseudo'],
                },
            ],
            where: { id: postId },
        });
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send({ error: "La publication avec l'id numéro " + req.params.id + " est introuvable !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Créér une publication
exports.createPost = async (req, res) => {
    let content = req.body.content;
    let userId = req.body.UserId;
    let fileName;
    let contentTrue = verifyUserInput.validPost(content);

    // Vérification des champs renseignés par l'utilisateur
    if (contentTrue == false) {
        res.status(400).send({
            errorContent: "La publication doit contenir entre 3 et 250 caractères !",
        });
    };

    // Si l'utilisateur upload un fichier
    if (req.file != null) {
        try {
            if (
                req.file.detectedMimeType !== 'image/jpg' &&
                req.file.detectedMimeType !== 'image/png' &&
                req.file.detectedMimeType !== 'image/jpeg'
            )
                throw Error('invalid file');

            if (req.file.size > 500000) throw Error('max size');
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).send({ errors });
        }

        fileName = userId + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../../front-end/public/uploads/posts/${fileName}`,
            ),
        );
    }

    try {
        await Posts.create({
            content: content,
            imageUrl: req.file != null ? './uploads/posts/' + fileName : '',
            UserId: userId,
            videoUrl: req.body.video,
        })
            .then(newPost => res.status(201).send({ newPost }))
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        return res.status(500).send(error)
    };
};

// Modifier une publication
exports.updatePost = async (req, res) => {
    let content = req.body.content;
    let contentTrue = verifyUserInput.validPost(content);

    // Vérification des champs renseignés par l'utilisateur
    if (contentTrue == false) {
        res.status(400).send({
            errorContent: "La publication doit contenir entre 3 et 250 caractères !",
        });
    };

    try {
        const post = await Posts.findOne({
            where: { id: req.params.id },
        });
        await post
            .update({
                content: content,
            })
            .then(post => res.status(201).send({ post }))
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        res.status(500).send({ error });
    };
};

// Supprimer une publication
exports.deletePost = async (req, res) => {
    try {
        const post = await Posts.findOne({ where: { id: req.params.id } });
        if (post) {
            post
                .destroy()
                .then(
                    res.status(200).send({
                        message: "La publication avec l'id " + req.params.id + ' a été supprimé !',
                    }),
                )
                .catch(error => res.status(400).send({ error }));
        } else {
            res.status(400).send({ error: "La publication avec l'id numéro " + req.params.id + " est introuvable !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};