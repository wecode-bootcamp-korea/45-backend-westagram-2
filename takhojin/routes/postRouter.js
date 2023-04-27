const express = require("express");
const postController = require("../controllers/postController");
const { checkToken } = require("../utils/checkToken");

const router = express.Router();

router.post("/postup", checkToken, postController.postUp);
router.get("/postAll", postController.postAllGet);
router.get("/updatedPost", postController.updatedPost);
router.delete("/deletePost", postController.deletePost);
router.post("/postLike", postController.postLike);

module.exports = {
  router,
};
