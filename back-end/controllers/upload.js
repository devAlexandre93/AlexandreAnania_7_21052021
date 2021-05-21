// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du controller contenant toute la logique métier s'appliquant à l'upload de fichier
// Dans le controller il n'y a que la logique métier
// La logique de routing sera enregistrée dans le dossier routes

const { Users } = require('../models'); // Import du modèle 'Users' créé grâce à la fonction sequelize
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors'); // Import permettant de gérer les erreurs

// Ajout de la photo de profil
exports.uploadProfile = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== 'image/svg+xml' &&
            req.file.detectedMimeType !== 'image/jpg' &&
            req.file.detectedMimeType !== 'image/png' &&
            req.file.detectedMimeType !== 'image/jpeg'
        )
            throw Error('invalid file');
        if (req.file.size > 500000) throw Error('max size');
    } catch (error) {
        const errors = uploadErrors(error);
        return res.status(400).json({ errors });
    }

    const fileName = req.body.name + '.jpg';

    await pipeline(
		req.file.stream,
		fs.createWriteStream(
			`${__dirname}/../../front-end/public/uploads/profile/${fileName}`,
		),
	);

    try {
		const user = await Users.findOne({
			attributes: ['pictureUrl', 'id'],
			where: { id: req.body.userId },
		});
		await user
			.update({
				pictureUrl: './uploads/profile/' + fileName,
			})
			.then(res.status(201).send({ message: 'La photo a correctement été ajoutée !' }))
			.catch(error => res.status(400).send(error));
	} catch (error) {
		res.status(500).send({ error }); 
	}
};

