const userDao = require("../models/userDao");
const {
  passwordValidationCheck,
  emailValidationCheck,
} = require("../utils/validation-check");
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
  await passwordValidationCheck(password);
  await emailValidationCheck(email);

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
  const payLoad = { userId: hashedPassword.id };
  return jwt.sign(payLoad, process.env.secretKey);
};

module.exports = {
  signUp,
  login,
};
