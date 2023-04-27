const userService = require('../services/userService');
const { emailValidationCheck, passwordValidationCheck } = require('../utils/validation-check');


const signUp = async ( req, res ) => {
    try {
        const { firstName, lastName, email, phoneNumber, age, userName, password } = req.body;
        
        if( !firstName || !lastName || !email || !phoneNumber || !age || !userName || !password)
            return res.status(400).json({ message: "�KEY_ERROR" });

        await emailValidationCheck(email);
        await passwordValidationCheck(password);
        
        await userService.signUp( firstName, lastName, email, phoneNumber, age, userName, password );
        return res.status(201).json({ message: "userCreated" });
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    };
};

const login = async (req, res) => {
    try{
        const { userName, password } = req.body;
        if(!userName || !password) return res.status(400).json({ message: "INVALID_KEY" });

        const accessToken = await userService.getUserByName(userName, password);
        
        return res.status(201).json({ accessToken });
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 401).json({ message: err.message });
    };
};

module.exports = { signUp, login };