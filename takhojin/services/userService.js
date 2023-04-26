const bcrypt = require("bcrypt");

const userDao = require("../models/userDao");
const { pwValidation } = require("../utils/validation-check");

const signUp = async (email, password, description, profileImg) => {
  await pwValidation(password);
  const salt = 13;
  const hashPassword = await bcrypt.hash(password, salt);

  return userDao.createUser(email, hashPassword, description, profileImg);
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
};
