const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");
const {
  passwordValidationCheck,
  emailValidationCheck,
} = require("../utils/validation-check");

const signUp = async (name, profileImage, email, password, phoneNumber) => {
  await passwordValidationCheck(password);
  await emailValidationCheck(email);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return userDao.createUser(
    name,
    profileImage,
    email,
    hashedPassword,
    phoneNumber
  );
};

const login = async (email, password) => {
  const [user] = await userDao.getUserByEmail(email);
  if (!user || !bcrypt.compare(password, user.password))
    throw new Error("Invalid Email or Password");

  const exp = process.env.JWT_EXP;
  const issuer = process.env.JWT_ISSUER;
  const option = { expiresIn: exp, issuer: issuer };
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, option);
};

module.exports = {
  signUp,
  login,
};
