// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du router contenant les fonctions qui s'appliquent aux différentes routes pour les publications
// Dans le router il n'y a que la logique de routing
// La logique métier sera enregistrée dans le dossier controllers

const express = require('express'); // Ajout de plugin externe nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du router avec la méthode mise à disposition par Express
const multer = require('multer'); // Ajout du plugin externe 'multer' nécessaire au chargement de fichier
const upload = multer(); // Appel des fonctions de "multer"

// Ajout des controllers et middlewares
const postCtrl = require('../controllers/post');
const { checkUser, requireAuth } = require('../middlewares/auth');

// Ajout des routes "post"
router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', upload.single('file'), checkUser, requireAuth, postCtrl.createPost);
router.put('/:id', checkUser, requireAuth, postCtrl.updatePost);
router.delete('/:id', checkUser, requireAuth, postCtrl.deletePost);

// Export
module.exports = router;