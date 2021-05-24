// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

// Exports

// Fonction permettant d'afficher la date pour la page de profil
export const dateParser = (num) => {
    let options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    let timestamp = Date.parse(num);

    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);

    return date.toString();
}

// Fonction permettant d'afficher la date pour les publications
export const dateParserPost = num => {
	let options = {
		hour: '2-digit',
		minute: '2-digit',
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	let timestamp = Date.parse(num);

	let date = new Date(timestamp).toLocaleDateString('fr-FR', options);

	return date.toString();
};

// Fonction permettant d'afficher la date pour les prévisualisation de publication

export const timeStampParser = (num) => {
	let options = {
	  hour: "2-digit",
	  minute: "2-digit",
	  weekday: "long",
	  year: "numeric",
	  month: "short",
	  day: "numeric",
	};
  
	let date = new Date(num).toLocaleDateString("fr-FR", options);
  
	return date.toString();
  }

// Fonction permettant de gérer les situations où l'utilisateur laisse un champs vide)
export const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
};