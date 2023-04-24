const express = require("express");
const postAllGetController = require("../controllers/postAllGetController");

const router = express.Router();

router.get("/postAllGet", postAllGetController.postAllGet);

module.exports = {
  router,
};
