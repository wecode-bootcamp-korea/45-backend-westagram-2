const postService = require("../services/postService");

const postUp = async (req, res) => {
  try {
    const { title, description, image, userId } = req.body;

    if (!title || !description || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.postUp(title, description, image, userId);
    return res.status(201).json({ message: "POSTUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postAllGet = async (req, res) => {
  try {
    const posts = await postService.postAllGet();
    return res.status(201).json({ data: posts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatedPost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    if (!userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const result = await postService.updatedPost(userId, postId);
    return res.status(201).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.body;
  try {
    if (!postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.deletePost(postId);
    return res.status(201).json({ message: "DELETE_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postLike = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    if (!postId || !userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await postService.postLike(userId, postId);
    return res.status(201).json({ message: "LIKE" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  postUp,
  postAllGet,
  updatedPost,
  deletePost,
  postLike,
};
