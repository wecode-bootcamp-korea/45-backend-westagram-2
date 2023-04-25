const express = require("express");

const userRouter = require("./userRoute");
const postRouter = require("./postRoute");
const likesRouter = require("./likesRoute");

const router = express.Router();

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/likes", likesRouter.router);

module.exports = router;
