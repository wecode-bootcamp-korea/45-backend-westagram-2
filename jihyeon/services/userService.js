const bcrypt = require("bcrypt");

const createUserDao = require("../models/UserDao");
const pwValidationCheck = require("../utils/validation-check.js");

const signUp = async (email, password, name, age, phoneNumber) => {
  await pwValidationCheck(password);

  const hashedPassword = await bcrypt.hash(password, 12);

  return createUserDao.createUser(
    email,
    hashedPassword,
    name,
    age,
    phoneNumber
  );
};

module.exports = {
  signUp,
};
