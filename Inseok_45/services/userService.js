const userDao = require('../models/userDao');
const bcrypt = require("bcrypt");

const signUp = async( firstName, lastName, email, phoneNumber, age, userName, password ) => {
    
    const saltRounds = Number(process.env.SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createUser = await userDao.createUser(
        firstName,
        lastName,
        email,
        phoneNumber,
        age,
        userName,
        hashedPassword
    );

    return createUser;
};

const login = async ( userName, password ) => {
    try{
        const [dbPassword] = await userDao.login(userName);
        const hashedPassword = dbPassword.password;
        const userEmail = dbPassword.email
        const result = await bcrypt.compare(password, hashedPassword);
        const tokenInfo = {
            "exists" : result,
            "email" : userEmail
        }
        
        return tokenInfo;

    } catch(err) {
        const error = new Error('Could not get data');
        error.statusCode = 400;
        throw error;
    };
};


module.exports = { signUp, login };