// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Likes extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Users.belongsToMany(models.Posts, {
				through: models.Likes,
				foreignKey: 'userId',
				otherKey: 'postId',
				onDelete: 'cascade',
			});

			models.Posts.belongsToMany(models.Users, {
				through: models.Likes,
				foreignKey: 'postId',
				otherKey: 'userId',
				onDelete: 'cascade',
			});

			models.Likes.belongsTo(models.Users, {
				foreignKey: 'userId',
				as: 'users',
				onDelete: 'cascade',
			});

			models.Likes.belongsTo(models.Posts, {
				foreignKey: 'postId',
				as: 'posts',
				onDelete: 'cascade',
			});
		}
	}
	Likes.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
			postId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'Likes',
		},
	);
	return Likes;
};