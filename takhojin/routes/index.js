const express = require("express");

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

const router = express.Router();

router.use("/posts", postRouter.router);
router.use("/users", userRouter.router);

module.exports = router;
