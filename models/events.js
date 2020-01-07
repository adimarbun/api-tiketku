"use strict";
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define(
    "events",
    {
      title: DataTypes.STRING,
      category: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      price: DataTypes.DECIMAL,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      urlMaps: DataTypes.STRING,
      img: DataTypes.STRING,
      createBy: DataTypes.INTEGER
    },
    {}
  );
  events.associate = function(models) {
    events.belongsTo(models.categories, {
      foreignKey: "category",
      as: "categories",
      sourceKey: "id"
    });
    events.belongsTo(models.users, {
      foreignKey: "createBy",
      as: "users",
      sourceKey: "id"
    });

    // events.hasMany(models.favorites, {
    //   foreignKey: "id",
    //   as: "favorites"
    // });
  };
  return events;
};
