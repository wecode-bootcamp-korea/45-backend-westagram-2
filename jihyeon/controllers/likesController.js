const likesService = require("../services/likesService");

const likes = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const userLikes = await likesService.likes(userId, postId);

    if (userLikes == true) {
      return res.status(201).json({ message: "likeCreated" });
    } else if (userLikes == false) {
      return res.status(201).json({ message: "likeCanceled" });
    }
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  likes,
};
