const postDao = require("../models/postDao");

const posting = async (userId, postContent, postImage) => {
  const createPost = await postDao.createPost(userId, postContent, postImage);

  return createPost;
};

const viewPosts = async () => {
  const viewPosts = await postDao.viewPosts();

  return viewPosts;
};

const viewUserPosts = async (userId) => {
  const viewUserPosts = await postDao.viewUserPosts(userId);

  return viewUserPosts;
};

const deletePost = async (userId, postId) => {
  const deletePost = await postDao.deletePost(userId, postId);

  return deletePost;
};

const updatePost = async (postImage, postContent, userId, postId) => {
  const updatePost = await postDao.updatePost(
    postImage,
    postContent,
    userId,
    postId
  );

  return updatePost;
};

module.exports = {
  posting,
  viewPosts,
  viewUserPosts,
  deletePost,
  updatePost,
};
