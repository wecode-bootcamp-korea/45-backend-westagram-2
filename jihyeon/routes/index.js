const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const postRouter = require("./postRoute");
const likesRouter = require("./likesRoute");

router.use("/users", userRouter.router);
router.use("/posts", postRouter.router);
router.use("/likes", likesRouter.router);

module.exports = router;
