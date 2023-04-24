const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", userController.signUp);

// router.post ( 경로 , 콜백함수)
// app.post ( 경로 , 함수실행) 과 같은부분
// 함수 = > userController 로 정의된 부분에 signUp모듈 실행

module.exports = {
  router,
};
