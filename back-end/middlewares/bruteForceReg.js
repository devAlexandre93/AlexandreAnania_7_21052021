// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

const bruteForceReg = require('express-rate-limit'); // Import du module 'express-rate-limit' permettant de limiter le nombre de request à l'API

//  Blocage de la création de compte pendant 1 heure à partir de 5 créations de compte provenant d'une même adresse IP
module.exports = bruteForceReg({
	windowMs: 60 * 60 * 1000,
	max: 5,
	statusCode: 200,
	message: {
		status: 429,
		errorBrute:
			"Vous ne pouvez plus créer de compte pour le moment, veuillez réessayer dans 1 heure !",
	},
});