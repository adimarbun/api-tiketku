const Categories = require("../models").categories;

//show categories
exports.showAll = (req, res) => {
  Categories.findAll({ attributes: ["id", "name"] }).then(data =>
    res.send(data)
  );
};

exports.showCategory = (req, res) => {
  Categories.findOne({
    attributes: ["id", "name"],
    where: { id: req.params.id }
  }).then(data => res.send(data));
};

exports.store = (req, res) => {
  Categories.create(req.body).then(categories => {
    res.send({
      message: "success",
      categories
    });
  });
};
