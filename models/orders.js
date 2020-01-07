"use strict";
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      event: DataTypes.INTEGER,
      quantity: DataTypes.DECIMAL,
      totalPrice: DataTypes.DECIMAL,
      status: DataTypes.INTEGER,
      orderBy: DataTypes.INTEGER,
      attachment: DataTypes.STRING
    },
    {}
  );
  orders.associate = function(models) {
    orders.belongsTo(models.events, {
      foreignKey: "event",
      as: "events",
      sourceKey: "id"
    });
    orders.belongsTo(models.status, {
      foreignKey: "status",
      as: "statuses",
      sourceKey: "id"
    });
    orders.belongsTo(models.users, {
      foreignKey: "orderBy",
      as: "users",
      sourceKey: "id"
    });
  };
  return orders;
};
