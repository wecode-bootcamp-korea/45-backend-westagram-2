const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/users", userRouter.router);
// /users -> 이 경로가 입력되면 그 옆을 실행
const postRouter = require("./postRouter");
router.use("/posts" postRouter.router);

const postAllGetRouter = require("./postAllGetRouter");
router.use("/postAllGet" postAllGetRouter.router);

const userSearchPostRouter = require("./userSearchPostRouter");
router.use("/userSearchPost" userSearchPostRouter.router);

const postUpdateRouter = require("./postUpdateRouter");
router.use("/postUpdate" postUpdateRouter.router);


module.exports = router;
