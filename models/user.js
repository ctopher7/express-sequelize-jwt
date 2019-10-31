'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status:DataTypes.ENUM('unverified','verified'),
    iat:DataTypes.DATE
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};