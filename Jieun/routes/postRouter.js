const express = require("express");
const postController = require("../controllers/postController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth, postController.createPosts);
router.get("/all", postController.getAllPosts);
router.get("/users/:userId", postController.getSpecificUserPosts);
router.patch("/:postId", postController.modifyPosts);
router.delete("/:postId", postController.deleteResultPosts);

module.exports = {
  router,
};
