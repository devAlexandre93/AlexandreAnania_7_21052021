// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Création du router contenant les fonctions qui s'appliquent aux différentes routes pour les utilisateurs
// Dans le router il n'y a que la logique de routing
// La logique métier sera enregistrée dans le dossier controllers

const express = require('express'); // Ajout du plugin externe nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du router avec la méthode mise à disposition par Express
const multer = require('multer'); // Ajout du plugin externe 'multer' nécessaire au chargement de fichier
const upload = multer(); // Appel des fonctions de "multer"

// Ajout des controllers et middlewares
const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/user');
const uploadCtrl = require('../controllers/upload');
const { checkUser, requireAuth } = require('../middlewares/auth');

// Ajout des routes "auth"
router.post('/signup', authCtrl.signUp);
router.post("/login", authCtrl.login);
router.get("/logout", authCtrl.logout);

// Ajout des routes "user"
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', checkUser, requireAuth, userCtrl.updateUser);
router.delete('/:id', checkUser, requireAuth, userCtrl.deleteUser);

// Ajout de la route upload
router.post('/upload', upload.single('file'), checkUser, requireAuth, uploadCtrl.uploadProfile);

// Export
module.exports = router;