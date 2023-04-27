const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { email, password, description, profileImg } = req.body;

    if (!email || !password || !description || !profileImg) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userService.signUp(email, password, description, profileImg);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const autorization = await userService.login(email, password);

    return res.status(200).json({ autorization });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const searchUserPost = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const data = await userService.searchUserPost(userId);

    return res.status(201).json({ message: data });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateUserPost = async (req, res) => {
  try {
    const { description, userId, postId } = req.body;

    if (!description || !userId || !postId) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    await userService.updateUserPost(description, userId, postId);
    return res.status(201).json({ message: "FIXED_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  searchUserPost,
  updateUserPost,
  login,
};
