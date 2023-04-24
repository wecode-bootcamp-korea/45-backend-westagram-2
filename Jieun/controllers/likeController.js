const likeService = require("../services/likeService");

const createLikes = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const createLike = await likeService.createLikes(userId, postId);
    if (createLike.insertId)
      return res.status(201).json({ message: "likeCreated" });
    else return res.status(200).json({ message: "likeDelete" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createLikes,
};
