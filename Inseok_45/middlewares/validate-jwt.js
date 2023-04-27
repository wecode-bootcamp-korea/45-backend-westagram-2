const jwt = require('jsonwebtoken');
const userService = require('../services/userService');


const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(403).json({ message: "NEED_ACCESS_TOKEN" });

    const verified = jwt.verify(token, process.env.JWT_SECRETKEY);
    const userId = verified.id
    
    try{
        const user = await userService.checkExist(userId);
        console.log(user);
        if(!user) {
            const error = new Error("USER_DOES_NOT_EXIST")
            error.statusCode = 404;
            return res.status(error.statusCode).json({ message: error.message });
        }
        
        req.user = user;
        next();
    } catch(err){
        const error = new Error('NO MATCHING USER');
        error.statusCode = 400;
        throw error;
    }

    
}

module.exports = { validateToken };