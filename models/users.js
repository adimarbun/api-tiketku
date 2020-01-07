"use strict";
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      noTelp: DataTypes.STRING,
      img: DataTypes.STRING
    },
    {}
  );
  users.associate = function(models) {
    // users.hasMany(models.favorites, {
    //   foreignKey: "id",
    //   as: "favorites"
    // });
  };
  return users;
};
