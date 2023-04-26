const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userDao = require('../models/userDao');


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

const getUserById = async ( userName, password ) => {
    try{
        const [dbPassword] = await userDao.getUserById(userName);
        const userId = dbPassword.id;
        const hashedPassword = dbPassword.password;
        const result = await bcrypt.compare(password, hashedPassword);

        if(!result) return res.status(400).json({ message: "Invalid User" });

        const userInfo = { id: userId };
        const secretKey = process.env.JWT_SECRETKEY;
        const options = { expiresIn: '10h', issuer: 'inni' };
        const token = jwt.sign(userInfo, secretKey, options);
        return token;

    } catch(err) {
        const error = new Error('Could not get data');
        error.statusCode = 400;
        throw error;
    };
};


module.exports = { signUp, getUserById };