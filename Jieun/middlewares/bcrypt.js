const bcrypt = require("bcrypt");

const saltRounds = 10;
const password = "password";

const makeHash = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds);
};

const checkHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const bcryptMain = async () => {
  const hashedPassword = await makeHash(password, saltRounds);
  console.log(hashedPassword);
};

const jwtMain = async () => {
  const hashedPassword = await makeHash("password", 12);
  const result = await checkHash("password", hashedPassword);
  console.log(result);
};

bcryptMain();
jwtMain();
