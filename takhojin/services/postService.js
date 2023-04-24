const postDao = require("../models/postDao");

const postUp = async (title, description, image, userId) => {
  const createPost = await postDao.createPost(
    title,
    description,
    image,
    userId
  );
  return createPost;
};

module.exports = {
  postUp,
};
