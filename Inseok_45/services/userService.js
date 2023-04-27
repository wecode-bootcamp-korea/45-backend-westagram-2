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

const getUserByName = async ( userName, password ) => {
    try{
        const user = await userDao.getUserByName(userName);

        if (!user || !bcrypt.compare(password, user.password)) throw new Error("Invalid UserName or Password");
        
        return jwt.sign({ id: user.id }, process.env.JWT_SECRETKEY, { expiresIn: '10h', issuer: 'inni' });     

    } catch(err) {
        const error = new Error('Could not get data');
        error.statusCode = 400;
        throw error;
    };
};

const checkExist = async (userId) => {
    try{
        const user = await userDao.checkUserById(userId);
        const checkedId = user.id
        return checkedId;
    } catch(err){
        const error = new Error('CAN_NOT_FIND_USER');
        error.statusCode = 400;
        throw error;
    }
}


module.exports = { signUp, getUserByName, checkExist };