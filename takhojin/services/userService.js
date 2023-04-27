const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");
const { pwValidation } = require("../utils/validation-check");

const signUp = async (email, password, description, profileImg) => {
  await pwValidation(password);

  const hashPassword = await bcrypt.hash(password, 13);

  return await userDao.createUser(email, hashPassword, description, profileImg);
};

const login = async (email, password) => {
  await pwValidation(password);

  const [user] = await userDao.getUserByEmail(email);

  if (!user) throw new Error("INVALID_EMAIL_OR_PASSWORD");

  const checkResult = await bcrypt.compare(password, user.password);

  if (!checkResult) throw new Error("INVALID_EMAIL_OR_PASSWORD");

  return jwt.sign({ userId: user.id }, process.env.secretKey);
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
