// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du router contenant les fonctions qui s'appliquent aux différentes routes pour les commentaires
// Dans le router il n'y a que la logique de routing
// La logique métier sera enregistrée dans le dossier controllers

const express = require('express'); // Ajout de plugin externe nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du router avec la méthode mise à disposition par Express

// Ajout des controllers et middlewares
const commentCtrl = require('../controllers/comment');
const { checkUser, requireAuth } = require('../middlewares/auth');

// Ajout des routes "comment"
router.post('/commentpost/:id', checkUser, requireAuth, commentCtrl.commentPost);
router.patch('/editcomment/:id', checkUser, requireAuth, commentCtrl.updateComment);
router.delete('/deletecomment/:id', checkUser, requireAuth, commentCtrl.deleteComment);
router.get('/getcomments', commentCtrl.getAllComments);

// Export
module.exports = router;