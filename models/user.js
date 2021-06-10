'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

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
        set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        },
      },
    },
    { sequelize }
  );

  User.associate = (models) => {
    User.hasMany(models.Course, { foreignKey: 'userId' });
  };

  return User;
};
