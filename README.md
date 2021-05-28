# Groupomania #

Ceci est le projet 7 du parcours Développeur web d'OpenClassrooms consistant à créer un réseau social d'entreprise

## Prérequis ##

- NodeJS
- MySQL

## Étapes pour faire fonctionner l'application depuis son ordinateur ##

### Initialisation du back-end ###

- Cloner ce repository
- Lancer le terminal depuis le dossier `back-end` et exécuter `npm install` pour installer les dépendances du projet 
- Depuis le dossier `back-end`, exécuter la commande `npm install --save-dev sequelize-cli` pour installer l'interface de ligne de commande Sequelize
- Dans le dossier `config` du dossier `back-end`, modifier la partie "development" du fichier `config.json` comme indiqué :
"development": {
    "username": "Votre nom d'utilisateur MySQL",
    "password": "Votre mot de passe MySQL",
    "database": "Le nom de la base de données créée au préalable via MySQL",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
- Dans le dossier `config` du dossier `back-end`, créer un fichier `.env` et le remplir le comme indiqué :
PORT=3001
CLIENT_URL=http://localhost:3000
TOKEN_SECRET=Token aléatoire
SECRET_SESSION=Clé aléatoire
- Depuis le dossier `back-end`, exécuter la commande `npm start` pour lancer le serveur, si tout fonctionne correctement le message `Server running on port 3001` apparaitra

### Initialisation du front-end ###

- Lancer un nouveau terminal depuis le dossier `front-end` et exécuter `npm install` pour installer les dépendances du projet 
- Dans le dossier `front-end`, créer un fichier `.env` et le remplir le comme indiqué :
REACT_APP_API_URL=http://localhost:3001/
- Depuis le dossier `front-end`, exécuter la commande `npm start`, si tout fonctionne correctement l'application s'ouvrira automatiquement dans votre navigateur par défaut à l'adresse `http://localhost:3000/`
