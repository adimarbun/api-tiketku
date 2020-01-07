"use strict";
module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define(
    "favorites",
    {
      userId: DataTypes.INTEGER,
      eventId: DataTypes.INTEGER
    },
    {}
  );
  favorites.associate = function(models) {
    favorites.belongsTo(models.users, {
      foreignKey: "userId",
      as: "users",
      sourceKey: "id"
    });
    favorites.belongsTo(models.events, {
      foreignKey: "eventId",
      as: "events",
      sourceKey: "id"
    });
  };
  return favorites;
};
