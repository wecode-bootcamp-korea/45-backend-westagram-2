const userDao = require("../models/userDao");

const signUp = async (email, password, description, profile_img) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const createUser = await userDao.createUser(
    email,
    password,
    description,
    profile_img
  );
  return createUser;
};

module.exports = {
  signUp,
};
