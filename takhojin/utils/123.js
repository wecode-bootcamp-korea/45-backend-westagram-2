const jwt = require("jsonwebtoken");

const payLoad = { foo: "bar" };
const secretKey = "mySecreteKey";
const jwtToken = jwt.sign(payLoad, secretKey);

console.log(jwtToken);

// users/userSearchPost -> DAO에서 리턴이 안되는듯 쿼리문이 잘못됬나?
//  login도 DAO에서 리턴이 안되는듯
// 전체적인 리턴흐름 한번만 다시 물어보자 ㅜㅜㅜ

//email , password 받고
//service에서 controlloere 에서 넘어온 password-hash하고 와 dao에서 불러온 passowrd check해쉬
//if문
