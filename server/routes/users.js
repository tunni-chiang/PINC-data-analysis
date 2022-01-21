const express = require("express");
const router = express.Router();

// user model
const UserModel = require("../models/user.model");

// middleware to authenticate
const Auth = require("../middleware/auth");

router.post("/create", async (req, res) => {
  const { username, password, token } = req.body;
  const result = await UserModel.create(username, password, token);

  res.status(result.code).json(result);
});

router.get("/read", Auth.validate, async (req, res) => {
  const result = await UserModel.read(req.userId);

  res.status(result.code).json(result);
});

router.post("/update", Auth.validate, async (req, res) => {
  const allowedChanges = ["email", "password"];
  const changes = req.body;
  const result = await UserModel.update(req.userId, changes, allowedChanges);

  res.status(result.code).json(result);
});

router.post("/authenticate", async (req, res) => {
  let { username, password } = req.body;
  const result = await UserModel.authenticate(username, password);

  res.status(result.code).json(result);
});

router.post("/delete", Auth.validate, async (req, res) => {
  const result = await UserModel.delete(req.userId);

  res.status(result.code).json(result);
});

module.exports = router;
