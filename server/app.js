require("dotenv").config();

const express = require("express");
const app = express();

// middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
const server = require("./middleware/server");

// routes
const users = require("./routes/users");
const stats = require("./routes/stats");

// only allow api access to certain domains
// app.use(cors({ origin: ["*"], credentials: true }));
app.use(cors());

// use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(server.routes);

// custom rewrite headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/users", users);
app.use("/stats", stats);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
