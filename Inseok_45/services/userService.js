const userDao = require('../models/userDao');
const { emailValidationCheck, passwordValidationCheck } = require('../utils/validation-check.js');

const signUp = async( firstName, lastName, email, phoneNumber, age, userName, password ) => {

    await emailValidationCheck(email);
    await passwordValidationCheck(password);

        const createUser = await userDao.createUser(
            firstName,
            lastName,
            email,
            phoneNumber,
            age,
            userName,
            password
        );

        return createUser;
};

module.exports = { signUp };