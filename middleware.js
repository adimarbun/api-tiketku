const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  //get header

  const authHeader = req.headers["authorization"];

  //kondisi header
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401).send({ message: "Unauthorized" });
  }

  //pastikan token valid
  jwt.verify(token, "thisismysecretkey", (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Yoor Token Not Valid" });
    }
    userId = user.user.id;
    next();
  });
};
