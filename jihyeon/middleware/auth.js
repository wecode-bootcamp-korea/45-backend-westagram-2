const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json("TOKEN_IS_EMPTY");

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json("ACCESS_DENIED");
  }
};

module.exports = validateToken;
