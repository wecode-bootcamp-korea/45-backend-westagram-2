const userDao = require("../models/userDao");
const { pwValidation } = require("../utils/validation-check");
const bcrypt = require("bcrypt");

const salt = 13;

const makeHash = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

const signUp = async (email, password, description, profileImg) => {
  await pwValidation(password);

  const hashPassword = await makeHash(password, salt);
  return (createUser = await userDao.createUser(
    email,
    hashPassword,
    description,
    profileImg
  ));
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
