const secreteKey = process.env.secretKey;
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) new Error("INVALID_ACCESS_TOKEN");

    const decoded = jwt.verify(token, secreteKey);

    req.user = decoded.userId;

    next();
  } catch {
    res.status(401).json({ message: "INVALID_ACCESS_TOKEN" });
  }
};
module.exports = {
  checkToken,
};
