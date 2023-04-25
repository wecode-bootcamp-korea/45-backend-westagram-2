const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const makeHash = async (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds);
};

const checkHash = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const signUp = async (name, profileImage, email, password, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const hashedPassword = await makeHash(password, saltRounds);
  return userDao.createUser(
    name,
    profileImage,
    email,
    hashedPassword,
    phoneNumber
  );
};

const login = async (email, password) => {
  const [hashedPassword] = await userDao.loginUser(email);
  const result = await checkHash(password, hashedPassword.password);
  if (!result) {
    const err = new Error("Invalid User");
    err.statusCode = 409;
    throw err;
  }
  const payLoad = { foo: password };
  return jwt.sign(payLoad, process.env.secretKey);
};

module.exports = {
  signUp,
  login,
};
