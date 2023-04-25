const postService = require("../services/postService");

const posting = async (req, res) => {
  try {
    const { userId, postContent, postImage } = req.body;

    await postService.posting(userId, postContent, postImage);
    return res.status(201).json({ message: "postCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const viewPosts = async (req, res) => {
  try {
    const result = await postService.viewPosts();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const viewUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;

    const result = await postService.viewUserPosts(userId);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    await postService.deletePost(userId, postId);
    return res.status(200).json({ message: "postDeleted" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postImage, postContent, userId, postId } = req.body;

    const [result] = await postService.updatePost(
      postImage,
      postContent,
      userId,
      postId
    );
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  posting,
  viewPosts,
  viewUserPosts,
  deletePost,
  updatePost,
};
