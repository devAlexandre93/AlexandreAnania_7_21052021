// Formation OpenClassrooms - Développeur Web - Projet 7 - Alexandre Anania

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Users extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Users.hasMany(models.Posts, {
				onDelete: 'cascade',
                hooks: true 
			});
            models.Users.hasMany(models.Likes, {
                onDelete: "cascade",
            });
            models.Users.hasMany(models.Comments, {
                onDelete: "cascade",
            });
        };
	}
	Users.init(
		{
            pseudo:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                require: true,
                validate: {
                    len: [3, 55]
                }
            },    
			email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                require: true,
                validate: {
                    isEmail: true
                }
            },
			password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
			bio: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 350]
                }
            },
			pictureUrl: {
                type: DataTypes.STRING,
            },
		},
		{
			sequelize,
			modelName: 'Users',
		},
	);

	return Users;
};