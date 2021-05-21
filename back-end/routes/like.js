// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du router contenant les fonctions qui s'appliquent aux différentes routes pour les likes
// Dans le router il n'y a que la logique de routing
// La logique métier sera enregistrée dans le dossier controllers

const express = require('express'); // Ajout de plugin externe nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du router avec la méthode mise à disposition par Express

// Ajout des controllers et middlewares
const likeCtrl = require('../controllers/like');
const { checkUser, requireAuth } = require('../middlewares/auth');

// Ajout des routes "like"
router.patch('/likepost/:id', checkUser, requireAuth, likeCtrl.likePost);
router.patch('/unlikepost/:id', checkUser, requireAuth, likeCtrl.unlikePost);
router.get('/getlikes', likeCtrl.getLikes);

// Export
module.exports = router;