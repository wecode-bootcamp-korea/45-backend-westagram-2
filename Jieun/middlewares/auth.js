const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) return res.status(400).json({ message: "TOKEN_IS_EMPTY" });

    const payload = jwt.decode(token);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "TOKEN_CHECK" });
  }
};

module.exports = auth;
