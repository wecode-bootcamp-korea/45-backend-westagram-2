const userService = require('../services/userService');
const { emailValidationCheck, passwordValidationCheck } = require('../utils/validation-check');
const jwtToken = require('../utils/jwt')

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
        
        let result = await userService.login( userName, password );

        if(result === true){
            return res.status(200).json({ accessToken: jwtToken });
        } else {
            return res.status(400).json({ message: "Invalid User" })
        }

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 401).json({ message: err.message });
    };
};

module.exports = { signUp, login };