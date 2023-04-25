const emailValidationCheck = async (email) => {
    const emailValidation = new RegExp(
        '[a-zA-z0-9]+@[a-z]+\.[a-z]{2,3}'
    );

    if(!emailValidation.test(email)){
        const err = new Error(`EMAIL_IS_NOT_VALID`);
        err.statusCode = 400;
        throw err;
    }
};

const passwordValidationCheck = async (password) => {
    const pwValidation = new RegExp(
        '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );

    if(!pwValidation.test(password)){
        const err = new Error(`PASSWORD_IS_NOT_VALID`);
        err.statusCode = 400;
        throw err;
    }
}

module.exports = { emailValidationCheck, passwordValidationCheck };