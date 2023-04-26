const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = jwt.decode(token);
    const userId = payload.userId;
    req.userId = userId;
    next();
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = auth;
