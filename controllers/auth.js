const jwt = require("jsonwebtoken");
const models = require("../models");
const Users = require("../models").users;

const User = models.users;

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({
    where: { username, password }
  }).then(user => {
    if (user) {
      const token = jwt.sign({ user }, "thisismysecretkey");
      res.send({
        userId: user.id,
        username: user.username,
        message: "success",
        token
      });
    } else {
      res.send({
        error: true,
        message: "wrong email or password"
      });
    }
  });
};

exports.register = (req, res) => {
  Users.create(req.body).then(user => {
    const token = jwt.sign({ user }, "thisismysecretkey");
    res.send({
      userId: user.id,
      message: "success",
      email: user.email,
      token
    });
  });
};
