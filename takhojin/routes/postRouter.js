const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.post("/postup", postController.postUp);
router.get("/postAll", postController.postAllGet);
router.get("/updatedPost", postController.updatedPost);
router.delete("/deletePost", postController.deletePost);
router.post("/postLike", postController.postLike);

module.exports = {
  router,
};
