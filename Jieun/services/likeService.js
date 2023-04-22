const likeDao = require("../models/likeDao");

const createLikes = async (userId, postId) => {
  const likes = await likeDao.createLikes(userId, postId);

  return likes;
};

module.exports = {
  createLikes,
};
