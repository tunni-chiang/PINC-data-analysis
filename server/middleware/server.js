const print = require("../helper/print");
const Server = {};

Server.routes = (req, res, next) => {
  print.route(`${req.method}: ${req.url}`);
  next();
};

module.exports = Server;
