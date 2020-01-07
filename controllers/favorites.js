const Favorites = require("../models").favorites;
const Categories = require("../models").categores;
const Users = require("../models").users;
const Events = require("../models").events;

//create favorites

exports.createFavorites = (req, res) => {
  request = {
    userId: userId,
    eventId: req.body.eventId
  };
  Favorites.create(request).then(response => {
    Favorites.findOne().then(dataFavorit => {
      res.send(dataFavorit);
    });
  });
};

exports.showFavorit = (req, res) => {
  Favorites.findAll({
    where: {
      userId: userId
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    include: [
      {
        model: Events,
        as: "events"
      }
    ],
    limit: 3,
    order: [["createdAt", "DESC"]]
  }).then(data => {
    console.log(data);
    res.send(data);
  });
};
