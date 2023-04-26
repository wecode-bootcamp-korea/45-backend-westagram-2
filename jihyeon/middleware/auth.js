const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(403).json("ACCESS_DENIED");

    const decoded = jwt.verify(token, process.env.SECRETKEY);
    req.user = decoded.user_id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateToken;
