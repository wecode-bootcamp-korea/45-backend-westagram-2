const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const pwValidationCheck = require("../utils/validation-check.js");

const signUp = async (email, password, name, age, phoneNumber) => {
  await pwValidationCheck(password);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userDao.createUser(email, hashedPassword, name, age, phoneNumber);
};

const getUserByEmail = async (email, password) => {
  const [user] = await userDao.getUserByEmail(email);

  if (!user || !bcrypt.compare(password, user.password))
    throw new Error("Invalid Email or Password");

  return jwt.sign({ userId: user.id }, process.env.SECRETKEY);
};

module.exports = {
  signUp,
  getUserByEmail,
};
