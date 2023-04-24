const userSearchPostDao = require("../models/userSearchDao");

const userSearchPost = async (req, res) => {
  const { userId } = req.params;

  const userSearchPost = await userSearchPostDao.userSearchPost(userId);
  return userSearchPost;
};

module.exports = {
  userSearchPost,
};
