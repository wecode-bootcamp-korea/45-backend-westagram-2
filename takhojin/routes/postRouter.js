const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/postUp", postController.postUp);

module.expoerts = {
  router,
};
