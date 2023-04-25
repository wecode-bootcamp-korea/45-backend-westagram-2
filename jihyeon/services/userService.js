const createUserDao = require("../models/UserDao");
const pwValidationCheck = require("../utils/validation-check.js");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const signUp = async (email, password, name, age, phoneNumber) => {
  await pwValidationCheck(password);

  const hashedPassword = await makeHash(password, saltRounds);
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
