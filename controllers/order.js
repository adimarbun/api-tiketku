const Orders = require("../models").orders;
const Events = require("../models").events;
const Status = require("../models").status;
const Categories = require("../models").categories;
const Users = require("../models").users;

//post order
exports.postOrder = (req, res) => {
  request = {
    event: req.body.event,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    status: req.body.status,
    orderBy: userId,
    attachment: req.body.attachment
  };
  Orders.create(request).then(response => {
    res.send(response);
  });
};

// cek status orders
exports.updateOrders = (req, res) => {
  Orders.findOne({
    where: { id: req.params.id }
  })
    .then(() => {
      Orders.update(req.body, { where: { id: req.params.id } });
    })
    .then(() => {
      Orders.findOne({
        attributes: ["id", "quantity", "totalPrice", "attachment"],
        include: [
          {
            model: Events,
            as: "events",
            attributes: {
              exclude: ["createdAt", "updatedAt", "category", "createBy"]
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
            ]
          },
          {
            model: Status,
            as: "statuses",
            attributes: ["name"]
          }
        ],
        where: { id: req.params.id }
      }).then(respon => {
        res.send(respon);
      });
    });
};

exports.showOrders = (req, res) => {
  const status = req.query.status;
  Orders.findAll({
    where: { status: status },
    attributes: ["id", "quantity", "totalPrice", "attachment"],
    include: [
      {
        model: Events,
        as: "events",
        attributes: {
          exclude: ["createdAt", "updatedAt", "category", "createBy"]
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
        ]
      },
      {
        model: Status,
        as: "statuses",
        attributes: ["name"]
      }
    ]
  }).then(data => res.send(data));
};

exports.showOrderById = (req, res) => {
  Orders.findOne({
    where: { id: req.params.id, orderBy: userId },
    attributes: [
      "id",
      "quantity",
      "totalPrice",
      "attachment",
      "status",
      "orderBy"
    ],
    include: [
      {
        model: Events,
        as: "events",
        attributes: {
          exclude: ["createdAt", "updatedAt", "category", "createBy"]
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
        ]
      },
      {
        model: Status,
        as: "statuses",
        attributes: ["name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ]
  }).then(data => {
    if (data) {
      res.send({
        titleEvent: data.events.title,
        startTime: data.events.startTime,
        price: data.events.price,
        address: data.events.address,
        quantity: data.quantity,
        totalPrice: data.totalPrice,
        statusId: data.status,
        status: data.statuses.name,
        user: data.users.name,
        userId: data.users.id
      });
    } else {
      res.send({ message: "Not your Order" });
    }
  });
};

//show order is status = pending && orderBy=userId
exports.showOrderPending = (req, res) => {
  Orders.findAll({
    where: { orderBy: userId, status: 2 },
    attributes: [
      "id",
      "quantity",
      "totalPrice",
      "attachment",
      "status",
      "orderBy"
    ],
    include: [
      {
        model: Events,
        as: "events",
        attributes: {
          exclude: ["createdAt", "updatedAt", "category", "createBy"]
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
        ]
      },
      {
        model: Status,
        as: "statuses",
        attributes: ["name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ],
    order: [["createdAt", "DESC"]]
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.send({ message: "Not your Order" });
    }
  });
};

//show order status = approved

exports.showOrderApproved = (req, res) => {
  Orders.findAll({
    where: { orderBy: userId, status: 3 },
    attributes: [
      "id",
      "quantity",
      "totalPrice",
      "attachment",
      "status",
      "orderBy"
    ],
    include: [
      {
        model: Events,
        as: "events",
        attributes: {
          exclude: ["createdAt", "updatedAt", "category", "createBy"]
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
        ]
      },
      {
        model: Status,
        as: "statuses",
        attributes: ["name"]
      },
      {
        model: Users,
        as: "users",
        attributes: ["id", "name", "noTelp", "email", "img"]
      }
    ],
    order: [["createdAt", "DESC"]]
  }).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.send({ message: "Not your Order" });
    }
  });
};
