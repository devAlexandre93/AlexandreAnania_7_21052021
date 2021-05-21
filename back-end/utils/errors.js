// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Gestion des erreurs lors de l'inscription (création d'un utilisateur)
exports.signUpErrors = (error) => {
    let errors = { pseudo: '', email: '' };

    if (
        error.name === 'SequelizeUniqueConstraintError' &&
        Object.keys(error.fields)[0].includes('users.pseudo')
    )
        errors.pseudo = "Ce nom d'utilisateur existe déjà !";

    if (
        error.name === 'SequelizeUniqueConstraintError' &&
        Object.keys(error.fields)[0].includes('users.email')
    )
        errors.email = "Cette adresse email est déjà utilisée !";

    if (
        error.name === 'SequelizeValidationError' &&
        error.message.includes('Validation len on pseudo failed')
    )
        errors.pseudo = "Le nom d'utilisateur doit contenir entre 3 et 55 caractères !";

    if (
        error.name === 'SequelizeValidationError' &&
        error.message.includes('Validation isEmail on email failed')
    )
        errors.email = "L'email n'est pas valide !";

    return errors;
};

// Gestion des erreurs lors de la connexion (facultatif car déjà géré par la logique métier du controller)
//exports.loginErrors = (error) => {
//let errors = { email: '', password: '' };
//if (error.message.includes('email')) errors.email = 'Utilisateur introuvable !';
//if (error.message.includes('password')) errors.password = 'Mot de passe incorrect !';

//return errors;
//};

// Gestion des erreurs lors du chargement de fichier
exports.uploadErrors = error => {
    let errors = { format: '', maxSize: '' };

    if (error.message.includes('invalid file'))
        errors.format = 'Format incompatible !';

    if (error.message.includes('max size'))
        errors.maxSize = 'Le fichier dépasse 500ko !';

    return errors;
};