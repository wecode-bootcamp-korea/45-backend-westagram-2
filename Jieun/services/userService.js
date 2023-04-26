const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

const signUp = async (name, profileImage, email, password, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!pwValidation.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const createUser = await userDao.createUser(
    name,
    profileImage,
    email,
    hashedPassword,
    phoneNumber
  );

  return createUser;
};

module.exports = {
  signUp,
};
