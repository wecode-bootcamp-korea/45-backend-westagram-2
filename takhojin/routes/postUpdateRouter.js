const express = require("express");
const postUpdate = require("../controllers/postUpdate");

const router = express.Router();

router.patch("/postUpdate", postUpdate.postUpdate);

module.exports = {
  postUpdate,
};
