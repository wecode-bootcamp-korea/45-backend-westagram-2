const jwt = require('jsonwebtoken');


const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) return res.status(403).json({ message: "Can't Log In" });

    const verified = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = verified.id;
    next();
}

module.exports = { validateToken };