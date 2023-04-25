const userDao = require('../models/userDao');
const bcrypt = require("bcrypt");

const signUp = async( firstName, lastName, email, phoneNumber, age, userName, password ) => {
    
    const saltRounds = 12;
    const makeHash = async(password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds);
    }

    const main = async (password) => {
        const hashedPassword = await makeHash(password, saltRounds);
        return hashedPassword
    }

    const hashedPassword = main(password);

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
        const [dbPassword] = await userDao.login( userName, password) ;
        const hashedPassword = dbPassword.password;

        const result = await bcrypt.compare(password, hashedPassword);

        return result;

    } catch(err) {
        const error = new Error('Could not get data');
        error.statusCode = 400;
        throw error;
    };
};


module.exports = { signUp, login };