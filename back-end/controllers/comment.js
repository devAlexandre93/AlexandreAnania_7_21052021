// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du controller contenant toute la logique métier s'appliquant aux commentaires
// Dans le controller il n'y a que la logique métier
// La logique de routing sera enregistrée dans le dossier routes

const { Comments } = require('../models'); // Import du modèle 'Comments' créé grâce à la fonction sequelize
const { verifyUserInput } = require('../middlewares/verifyUserInput'); // Import d'un middleware permettant de vérifier si les champs à remplir sont bien renseignés par les utilisateurs

// Créer un commentaire
exports.commentPost = async (req, res) => {
    let userId = req.params.userid;
    let postId = req.params.postid;
    let commenterPseudo = req.body.commenterPseudo;
    let content = req.body.content;
    let contentTrue = verifyUserInput.validComment(content);

    // Vérification du champs renseigné par l'utilisateur
    if (contentTrue == false) {
        res.status(200).send({
            errorContentComment: "Le commentaire doit contenir entre 2 et 150 caractères !",
        });
        res.status(500).send({ error });
    };

    // Si le champs renseigné est valide, création du commenataire
    try {
        const newComment = await Comments.create({
            postId: postId,
            userId: userId,
            commenterPseudo: commenterPseudo,
            content: content,
        });

        if (newComment) {
            res.status(201).send({ newComment });
        } else {
            res.status(401).send({ error });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Modifier un commentaire
exports.updateComment = async (req, res) => {
    let content = req.body.content;
    let commentId = req.params.id;
    let contentTrue = verifyUserInput.validComment(content);

    // Vérification du champs renseigné par l'utilisateur
    if (contentTrue == false) {
        res.status(200).send({
            errorContentComment: "Le commentaire doit contenir entre 2 et 150 caractères !",
        });
        res.status(500).send({ error });
    };

    try {
        const commentFound = await Comments.findOne({
            attributes: [
                'id',
                'userId',
                'postId',
                'commenterPseudo',
                'content',
                'createdAt',
                'updatedAt',
            ],
            where: { id: commentId },
        });
        await commentFound
            .update({
                content: content,
            })
            .then(comment => res.status(200).send({ comment }))
            .catch(error => res.status(400).send({ error }));
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
    try {
        let commentId = req.params.id;

        // Vérification de l'existence du commentaire dans la base de données
        const commentFound = await Comments.findOne({
            where: { id: commentId },
        });
        if (!commentFound) {
            return res.status(200).send({ error: "Le commentaire avec l'id numéro " + req.params.id + " est introuvable !" });
        }

        // Suppression du commentaire s'il existe
        await Comments.destroy({
            where: { id: commentId },
        });
        res.status(200).send({ message: 'Le commentaire a été supprimé !' });
    } catch (error) {
        res.status(400).send({ error });
    }
};

// Obtenir tous les commentaires
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comments.findAll({
            attributes: [
                'id',
                'userId',
                'postId',
                'commenterPseudo',
                'content',
                'createdAt',
                'updatedAt',
            ],
        });
        if (comments > []) {
            res.status(200).send(comments);
        } else {
            return res.status(200).send({ error: "Il n'y a pas de commentaire pour le moment !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    }
};

// Obtenir les commentaires d'un post
exports.getCommentsPost = (async (req, res) => {
    try {
        const postId = req.params.postid;
        const comments = await Comments.findAll({ where: { PostId: postId } });
        if (comments > []) {
            res.status(200).send(comments);
        } else {
            res.status(200).send({ error: "La publication n'existe pas ou elle n'a pas de commentaire pour le moment !" });
        }
    } catch (error) {
        res.status(500).send({ error });
    };
});
