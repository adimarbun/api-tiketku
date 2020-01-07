const Events = require("../models").events;
const Categories = require("../models").categories;
const Users = require("../models").users;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Helper = require("../helper/helper");

//create events

exports.createEvent = (req, res) => {
  request = {
    title: req.body.title,
    category: req.body.category,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    price: req.body.price,
    description: req.body.description,
    address: req.body.address,
    urlMaps: req.body.urlMaps,
    img: req.body.img,
    createBy: userId
  };
  Events.create(request).then(response => {
    Events.findOne({
      attributes: {
        exclude: ["category", "createBy", "createdAt", "updatedAt"]
      },
      include: [
        {
          model: Categories,
          as: "categories",
          attributes: ["id", "name"]
        },
        {
          model: Users,
          as: "users",
          attributes: ["id", "name", "noTelp", "email", "img"]
        }
      ],
      where: { id: response.id }
    }).then(response => {
      res.send(response);
    });
  });
};

//show events by category

exports.showEventsCategory = (req, res) => {
  Events.findAll({
    attributes: {
      exclude: ["category", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ],
    where: { category: req.params.id },
    order: [["createdAt", "DESC"]]
  }).then(data => res.send(data));
};

//show event by id

exports.showEventById = (req, res) => {
  Events.findOne({
    attributes: {
      exclude: ["category", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ],
    where: { id: req.params.id }
  }).then(data =>
    res.send({
      id: data.id,
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      price: data.price,
      description: data.description,
      address: data.address,
      urlMaps: data.urlMaps,
      img: data.img,
      category: data.categories.name,
      name: data.users.name,
      noTelp: data.users.noTelp,
      email: data.users.email,
      userImage: data.users.img
    })
  );
};

//show all event

exports.showEventAll = (req, res) => {
  Events.findAll({
    attributes: {
      exclude: ["category", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ],
    order: [["createdAt", "DESC"]]
  }).then(data => res.send(data));
};

//show event when title

exports.showEventTitle = (req, res) => {
  const title = req.query.title;
  Events.findOne({
    attributes: {
      exclude: ["category", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: ["id", "name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ],
    where: { title: title }
  }).then(data => res.send(data));
};

//today

exports.upcoming = (req, res) => {
  let message = "";

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();

  finaltoday = yyyy + "-" + mm + "-" + dd;
  console.log(finaltoday);

  Events.findAll({
    attributes: {
      exclude: ["category", "createdAt", "updatedAt"]
    },
    include: [
      {
        model: Categories,
        as: "categories",
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      },
      {
        model: Users,
        as: "users",
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"]
        }
      }
    ],
    order: [["startTime", "ASC"]],
    where: {
      startTime: {
        [Op.gt]: finaltoday
      }
    }
  })
    .then(data => {
      if (data.length === null) {
        res.status(200).json({ message: "Data Not found" });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      message = "Bad request";
      res.status(400).json({ message });
    });
};

//events upcomming

// exports.upcoming = (req, res) => {
//   let message = "";

//   let today = new Date();
//   let dd = String(today.getDate()).padStart(2, "0");
//   let mm = String(today.getMonth() + 1).padStart(2, "0");
//   let yyyy = today.getFullYear();

//   finaltoday = yyyy + "-" + mm + "-" + dd;
//   console.log(finaltoday);

//   Events.findAll({
//     attributes: {
//       exclude: ["category", "createdAt", "updatedAt"]
//     },
//     include: [
//       {
//         model: Categories,
//         as: "categories",
//         attributes: {
//           exclude: ["createdAt", "updatedAt"]
//         }
//       },
//       {
//         model: Users,
//         as: "users",
//         attributes: {
//           exclude: ["password", "createdAt", "updatedAt"]
//         }
//       }
//     ],
//     where: {
//       startTime: {
//         [Op.gt]: finaltoday
//       }
//     }
//   })
//     .then(data => {
//       if (data.length === null) {
//         res.status(200).json({ message: "Data Not found" });
//       } else {
//         res.status(200).json(data);
//       }
//     })
//     .catch(error => {
//       message = "Bad request";
//       res.status(400).json({ message });
//     });
// };
