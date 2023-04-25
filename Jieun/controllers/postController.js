const postService = require("../services/postService");

const createPosts = async (req, res) => {
  try {
    const { userId, title, content, imageUrl } = req.body;

    await postService.createPosts(userId, title, content, imageUrl);
    return res.status(201).json({ message: "postCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const result = await postService.getAllPosts();
    return res.status(200).json({ message: "postGetSuccess", data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getSpecificUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await postService.getSpecificUserPosts(userId);
    return res
      .status(200)
      .json({ message: "postGetSuccess", userId, data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const modifyPosts = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, userId } = req.body;
    const updatePost = await postService.modifyPosts(content, postId, userId);
    if (!updatePost.affectedRows)
      return res.status(400).json({ message: "Failed, ease check the data!" });
    const result = await postService.modifyResultPosts(postId, userId);
    return res
      .status(200)
      .json({ message: "successfully updated", data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deleteResultPosts = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const result = await postService.deleteResultPosts(postId, userId);
    if (!result)
      return res.status(400).json({ message: "Failed, ease check the data!" });
    return res.status(200).json({ message: "postingDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
  getAllPosts,
  getSpecificUserPosts,
  modifyPosts,
  deleteResultPosts,
};
