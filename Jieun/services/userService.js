const userDao = require("../models/userDao");

const signUp = async (name, profileImage, email, password, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const createUser = await userDao.createUser(
    name,
    profileImage,
    email,
    password,
    phoneNumber
  );

  return createUser;
};

module.exports = {
  signUp,
};
