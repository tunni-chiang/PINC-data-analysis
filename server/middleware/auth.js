const jwt = require("jsonwebtoken");
const States = require("../helper/status_format");
const Auth = {};

// auth middleware
Auth.validate = (req, res, next) => {
  const token = req.headers["x-access-token"];
  let unauthorizedStatus = States.status400("Unauthorized Access", 401);

  if (!token) {
    return res.status(unauthorizedStatus.code).json(unauthorizedStatus);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //
    if (err) {
      return res.status(unauthorizedStatus.code).json(unauthorizedStatus);
    }

    req.userId = decoded.id;

    // if no errors, continute to next middleware
    next();
  });
};

module.exports = Auth;
