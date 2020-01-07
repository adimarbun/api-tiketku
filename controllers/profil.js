const Users = require("../models").users;

exports.showUser = (req, res) => {
  console.log(userId);
  Users.findOne({
    where: { id: userId },
    attributes: { exclude: ["password", "createdAt", "updatedAt"] }
  }).then(data => {
    res.send(data);
  });
};

exports.updateUser = (req, res) => {
  Users.findOne({
    where: { id: userId }
  })
    .then(data => {
      Users.update(req.body, { where: { id: data.id } });
    })
    .then(respon => {
      res.send(respon);
    });
};
