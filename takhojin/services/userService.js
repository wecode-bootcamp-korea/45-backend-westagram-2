const userDao = require("../models/userDao");
const { pwValidation } = require("../utils/validation-check");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const secretKey = process.env.secretKey;
const salt = 13;

const makeHash = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

const checkHash = async (password, hashedpassword) => {
  return await bcrypt.compare(password, hashedpassword);
};

const signUp = async (email, password, description, profileImg) => {
  await pwValidation(password);

  const hashPassword = await makeHash(password, salt);

  return await userDao.createUser(email, hashPassword, description, profileImg);
};

const login = async (email, password) => {
  await pwValidation(password);

  const hashedPasswordObj = await userDao.login(email);
  const hashedPassword = hashedPasswordObj[0].password;
  const hashedPasswordId = hashedPasswordObj[0].id;

  const checkResult = await checkHash(password, hashedPassword);

  console.log(checkResult);
  if (checkResult === true) {
    const payLoad = { userId: hashedPasswordId };
    return await jwt.sign(payLoad, secretKey);
  } else {
    const err = new Error("INVALID_USER");
    console.log(err);
    err.statuscode = 400;
    throw err;
  }
};

const searchUserPost = async (userId) => {
  const search = await userDao.searchUserPost(userId);
  return search;
};

const updateUserPost = async (description, userId, postId) => {
  const update = await userDao.updateUserPost(description, userId, postId);
  return update;
};

module.exports = {
  signUp,
  searchUserPost,
  updateUserPost,
  login,
};
