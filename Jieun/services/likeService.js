const likeDao = require("../models/likeDao");

const createLikes = async (userId, postId) => {
  return likeDao.createLikes(userId, postId);
};

module.exports = {
  createLikes,
};
