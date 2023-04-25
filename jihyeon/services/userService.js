const createUserDao = require("../models/UserDao");

const signUp = async (email, password, name, age, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }

  const createUser = await createUserDao.createUser(
    email,
    password,
    name,
    age,
    phoneNumber
  );

  return createUser;
};

module.exports = {
  signUp,
};
