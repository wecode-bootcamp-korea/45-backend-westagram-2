const express = require("express");
const likesController = require("../controllers/likesController");

const router = express.Router();

router.post("", likesController.likes);

module.exports = {
  router,
};
