const express = require("express");
const router = express.Router();

// user model
const DataModel = require("../models/data.model");

// middleware to authenticate
const Auth = require("../middleware/auth");

router.get("/read", Auth.validate, async (req, res) => {
  const result = await DataModel.read();
  res.status(result.code).json(result);
});

module.exports = router;
