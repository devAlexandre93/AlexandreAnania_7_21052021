// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");
    return Likes;
}