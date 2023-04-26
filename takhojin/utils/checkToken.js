const secreteKey = process.env.secretKey;
const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, secreteKey);
    next();
  } catch {
    const err = new Error("INVALID_ACCESS_TOKEN");
    console.log(err);
    err.statuscode = 400;
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  checkToken,
};
