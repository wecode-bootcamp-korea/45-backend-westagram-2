const userService = require('../services/userService');
const { emailValidationCheck, passwordValidationCheck } = require('../utils/validation-check');
const jwt = require('jsonwebtoken');

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

const login = async (req, res) => {
    try{
        const { userName, password } = req.body;
        if(!userName){
            return res.status(400).json({ message: "Username Required" });
        } else if(!password){
            return res.status(400).json({ message: "Password Required" });
        }
        
        const result = await userService.login(userName, password);
        const trueFalse = result.exists;
        const userEmail = result.email;

        if(!trueFalse) return res.status(400).json({ message: "Invalid User" });
            
        const userInfo = { email: userEmail };
        const secretKey = process.env.JWT_SECRETKEY;
        const options = { expiresIn: '10h', issuer: 'inni' };
        const token = jwt.sign(userInfo, secretKey, options)
        return res.status(200).json({ accessToken: token });

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 401).json({ message: err.message });
    };
};

module.exports = { signUp, login };