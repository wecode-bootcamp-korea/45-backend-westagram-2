const userDao = require("../models/userDao");
const {
  passwordValidationCheck,
  emailValidationCheck,
} = require("../utils/validation-check");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (name, profileImage, email, password, phoneNumber) => {
  await passwordValidationCheck(password);
  await emailValidationCheck(email);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
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
  const result = await bcrypt.compare(password, hashedPassword.password);
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
