const express = require("express");
const postController = require("../controllers/postController");
const validateToken = require("../middleware/auth");

const router = express.Router();

router.post("", validateToken, postController.posting);
router.get("/all", postController.viewPosts);
router.get("", postController.viewUserPosts);
router.delete("", postController.deletePost);
router.put("", postController.updatePost);

module.exports = {
  router,
};
