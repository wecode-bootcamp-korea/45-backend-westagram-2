const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { email, password, name, age, phoneNumber } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signUp(email, password, name, age, phoneNumber);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const accessToken = await userService.getUserByEmail(email, password);
    return res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signUp,
  login,
};
