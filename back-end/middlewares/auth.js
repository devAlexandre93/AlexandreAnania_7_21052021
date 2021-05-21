// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

const { Users } = require('../models'); // Import du modèle 'Users' créé grâce à la fonction sequelize
const jwt = require('jsonwebtoken');

// Vérification du token de l'utilisateur
exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if (error) {
                res.locals.user = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                let user = await Users.findOne({ where: { id: decodedToken.id } });
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    };
};

// Contrôle du token de l'utilisateur
exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
            if (error) {
                console.log(error);
            } else {
                console.log(decodedToken.id);
				next();
            }
        });    
    } else {
        console.log('Pas de token !')
    }
};
