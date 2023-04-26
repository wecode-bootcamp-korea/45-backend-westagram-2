const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const { emailValidationCheck, passwordValidationCheck } = require('../utils/validation-check');


const signUp = async ( req, res ) => {
    try {
        const { firstName, lastName, email, phoneNumber, age, userName, password } = req.body;
        
        if( !firstName || !lastName || !email || !phoneNumber || !age || !userName || !password)
            return res.status(400).json({ 
                message: "Cannot Sign Up" 
            });

        await emailValidationCheck(email);
        await passwordValidationCheck(password);
        await userService.signUp( firstName, lastName, email, phoneNumber, age, userName, password );
        return res.status(201).json({ 
            message: "userCreated"
        });
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    };
};

const getUserById = async (req, res) => {
    try{
        const { userName, password } = req.body;
        if(!userName || !password) return res.status(400).json({ message: "INVALID_KEY" });

        const token = await userService.getUserById(userName, password);
        console.log(token)
        return res.status(201).json({ accessToken : token })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 401).json({ message: err.message });
    };
};

module.exports = { signUp, getUserById };