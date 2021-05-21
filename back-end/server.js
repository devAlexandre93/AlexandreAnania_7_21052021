// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Import des modules npm - Ajout des plugins externes
const express = require('express'); // Importation d'express => Framework basé sur node.js
const cookieParser = require('cookie-parser'); // Importation de cookie-parser pour exploiter les cookies
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

// Déclaration des fonctions de vérification de l'utilisateur via jwt
const { checkUser, requireAuth } = require('./middlewares/auth');

// Création d'une application express  
const app = express();

// Utilisation des modules (plugins externes) nécessaires au fonctionnement
app.use(express.json()); // Transformation des données arrivant des requêtes POST en un objet JSON exploitable
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	allowedHeaders: ['sessionId', 'Content-Type'],
	exposedHeaders: ['sessionId'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
};
app.use(cors(corsOptions));

const db = require('./models');

// Déclaration des routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const likeRoutes = require('./routes/like');
const commentRoutes = require('./routes/comment');


// Utilisation des fonctions de vérification de l'utilisateur via jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => { res.status(200).json(res.locals.user.id) });

// Utilisation des routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/rate', likeRoutes);
app.use('/api/comment', commentRoutes);

// Lancement du serveur
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});