// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania


'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Comments extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		//static associate(models) {
			//models.Users.belongsToMany(models.Posts, {
			//	through: models.Comments,
			//	foreignKey: 'userId',
			//	otherKey: 'postId',
			//	onDelete:'cascade'
			//});
			//models.Posts.belongsToMany(models.Users, {
			//	through: models.Comments,
			//	foreignKey: 'postId',
			//	otherKey: 'userId',
			//	onDelete:'cascade'
			//});
			//models.Comments.belongsTo(models.Users, {
			//	foreignKey: 'userId',
			//	as: 'user',
			//	onDelete: 'cascade',
			//});
			//models.Comments.belongsTo(models.Posts, {
			//	foreignKey: 'postId',
			//	as: 'post',
			//	onDelete: 'cascade',
			//});
		//};
	};

	Comments.init(
		{
			//id: {
			//	type: DataTypes.INTEGER,
			//	primaryKey: true,
			//	autoIncrement: true
			//},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Users',
					key: 'id',
				},
				onDelete: 'cascade'
			},
			postId: {
				type: DataTypes.INTEGER,
				references: {
					model: 'Posts',
					key: 'id',
				},
				onDelete: 'cascade'
			},
			commenterPseudo: {
				type: DataTypes.STRING,
				references: {
					model: 'Users',
					key: 'pseudo',
				},
			},
			content: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Comments',
		}
	);

	return Comments;
};