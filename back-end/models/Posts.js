// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Posts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		 static associate(models) {
			// define association here
			models.Posts.belongsTo(models.Users, {
				foreignKey: {
					allowNull: false,
				},
				onDelete:'cascade'
			});
			//models.Posts.hasMany(models.Comments, {
				//onDelete:'cascade',
			//});
		}
	}

	Posts.init(
		{
			content: DataTypes.STRING,
			imageUrl: DataTypes.STRING,
			videoUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Posts',
		},
	);
    
	return Posts;
};
