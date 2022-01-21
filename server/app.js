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
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// use middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(server.routes);

app.use("/users", users);
app.use("/stats", stats);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
