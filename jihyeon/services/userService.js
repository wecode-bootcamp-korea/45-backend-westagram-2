const userDao = require("../models/userDao");
const pwValidationCheck = require("../utils/validation-check.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const signUp = async (email, password, name, age, phoneNumber) => {
  await pwValidationCheck(password);

  const hashedPassword = await makeHash(password, saltRounds);
  return userDao.createUser(email, hashedPassword, name, age, phoneNumber);
};

const login = async (email, password) => {
  const userInfo = await userDao.login(email);

  const storedPassword = userInfo[0]["password"];
  const userId = userInfo[0]["id"];

  const checkPassword = await checkHash(password, storedPassword);

  const payLoad = { user_id: userId };
  const secretKey = process.env.SECRETKEY;

  if (!checkPassword) {
    const err = new Error("Invalid User");
    err.statusCode = 409;
    throw err;
  }

  return (jwtToken = jwt.sign(payLoad, secretKey));
};

module.exports = {
  signUp,
  login,
};
