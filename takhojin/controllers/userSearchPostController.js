const userSearchPostService = require("../services/userSearchPostService");

const userSearchPost = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userSearchPostService.userSearchPost(userId);
    return res.status(201).json({ message: "SEARCH_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  userSearchPost,
};
