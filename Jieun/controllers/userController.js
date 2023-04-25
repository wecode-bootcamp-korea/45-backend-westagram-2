const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, profileImage, email, password, phoneNumber } = req.body;

    if (!name || !profileImage || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(name, profileImage, email, password, phoneNumber);
    return res.status(201).json({ message: "userCreated" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtToken = await userService.login(email, password);
    return res.status(200).json({ message: jwtToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  login,
};
