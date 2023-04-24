const express = require("express");
const userSearchPostController = require("../controllers/userSearchPostController");

const router = express.Router();

router.get("/userSearchPost", userSearchPostController.userSerchPost);

module.exports = {
  router,
};
