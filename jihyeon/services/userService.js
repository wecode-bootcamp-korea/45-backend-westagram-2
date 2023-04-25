const createUserDao = require("../models/UserDao");
const pwValidationCheck = require("../utils/validation-check.js");

const signUp = async (email, password, name, age, phoneNumber) => {
  await pwValidationCheck(password);

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
