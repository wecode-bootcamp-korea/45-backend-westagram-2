const { token } = require("morgan");
const postDao = require("../models/postDao");
const secreteKey = process.env.secretKey;
const jwt = require("jsonwebtoken");

const postUp = async (title, description, image, userId, token) => {
  const createPost = await postDao.createPost(
    title,
    description,
    image,
    userId
  );
  console.log(token);
  const decoded = jwt.verify(token, secreteKey);
  console.log(decoded);
  return createPost;
};

const postAllGet = async () => {
  const postSerch = await postDao.postAllGet();
  return postSerch;
};

const updatedPost = async (userId, postId) => {
  const updated = await postDao.updatedPost(userId, postId);
  return updated;
};

const deletePost = async (postId) => {
  const delPost = await postDao.deletePost(postId);
  return delPost;
};

const postLike = async (userId, postId) => {
  const like = await postDao.postLike(userId, postId);
  return like;
};

module.exports = {
  postUp,
  postAllGet,
  updatedPost,
  deletePost,
  postLike,
};
