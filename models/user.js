'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: '"firstName" is required' },
          notEmpty: { msg: 'Please provide a first name' },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: '"lastName" is required' },
          notEmpty: { msg: 'Please provide a first name' },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        unique: {
          msg: 'The email you entered already exists',
        },
        allowNull: false,
        validate: {
          isEmail: { msg: 'Please provide a valid email address' },
          notNull: { msg: '"emailAddress" is required' },
          notEmpty: { msg: 'Please provide an email address' },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: '"password" is required' },
          notEmpty: { msg: 'Please provide a password' },
        },
      },
    },
    { sequelize }
  );

  User.associate = (models) => {
    User.hasMany(models.Course);
  };

  return User;
};
