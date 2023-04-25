const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
router.use("/users", userRouter.router);
// /users -> 이 경로가 입력되면 그 옆을 실행
const postRouter = require("./postRouter");
router.use("/posts", postRouter.router);

module.exports = router;
