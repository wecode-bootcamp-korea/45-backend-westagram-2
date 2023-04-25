const userDao = require("../models/userDao");
const { pwValidation } = require("../utils/validation-check");

const signUp = async (email, password, description, profile_img) => {
  await pwValidation(password);

  const createUser = await userDao.createUser(email, description, profile_img);
  return createUser;
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
