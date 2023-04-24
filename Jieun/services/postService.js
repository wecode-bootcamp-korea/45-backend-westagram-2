const postDao = require("../models/postDao");
const userDao = require("../models/userDao");

const createPosts = async (userId, title, content, imageUrl) => {
  const isUserExisted = await userDao.isUserExisted(userId);

  if (!isUserExisted) throw new Error("User Does Not Exist");

  const registration = await postDao.createPosts(
    userId,
    title,
    content,
    imageUrl
  );

  return registration;
};

const getAllPosts = async () => {
  const allPosts = await postDao.getAllPosts();

  return allPosts;
};

const getSpecificUserPosts = async (userId) => {
  const userPosts = await postDao.getSpecificUserPosts(userId);

  return userPosts;
};

const modifyPosts = async (content, postId, userId) => {
  const modifyPosts = await postDao.modifyPosts(content, postId, userId);

  return modifyPosts;
};

const modifyResultPosts = async (postId, userId) => {
  const modifyPosts = await postDao.modifyResultPosts(postId, userId);

  return modifyPosts;
};

const deleteResultPosts = async (postId, userId) => {
  const deletePosts = await postDao.deleteResultPosts(postId, userId);

  return deletePosts;
};

module.exports = {
  createPosts,
  getAllPosts,
  getSpecificUserPosts,
  modifyPosts,
  modifyResultPosts,
  deleteResultPosts,
};
