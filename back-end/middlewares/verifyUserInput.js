// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

const verifyUserInput = {
    validPseudo: function (value) {
		const pseudoRegex = /^[\s\S]{3,55}/;
		return pseudoRegex.test(value);
	},
	validEmail: function (value) {
		const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
		return regexEmail.test(value);
	},
	validPassword: function (value) {
		const regexPassword = /^[\s\S]{6,55}/;
		return regexPassword.test(value);
	},
	validBio: function (value) {
		const regex = /^[\s\S]{0,150}/;
		return regex.test(value);
	},
	validPost: function (value) {
		const regex = /^[\s\S]{2,150}$/;
		return regex.test(value);
	},
	validComment: function (value) {
		const regex = /^[\s\S]{2,150}$/;
		return regex.test(value);
	},
};

module.exports = { verifyUserInput };