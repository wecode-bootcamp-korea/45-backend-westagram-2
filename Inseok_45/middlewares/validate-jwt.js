const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        //TODO: token 검증 코드

        next();
    } catch(err) {
        next(err);
    }
}

module.exports = { validateToken };