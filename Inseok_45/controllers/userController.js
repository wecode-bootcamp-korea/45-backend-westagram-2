const userService = require('../services/userService');

const signUp = async ( req, res ) => {
    try {
        const { firstName, lastName, email, phoneNumber, age, userName, password } = req.body;

        if( !firstName || !lastName || !email || !phoneNumber || !age || !userName || !password)
            return res.status(400).json({ 
                message: "Cannot Sign Up" 
            });
    
        await userService.signUp( firstName, lastName, email, phoneNumber, age, userName, password );
        return res.status(201).json({ 
            message: "Sign-Up Complete"
        });
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    };
};

module.exports = { signUp };