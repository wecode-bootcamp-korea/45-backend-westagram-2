const passwordValidationCheck = (password) => {
  const passwordRegex = new RegExp(
    "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})"
  );
  if (!passwordRegex.test(password)) {
    const err = new Error("PASSWORD_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
};

const emailValidationCheck = (email) => {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_+.-]+@([a-zA-Z0-9-])+[.][a-z]{2,3}$"
  );
  if (!emailRegex.test(email)) {
    const err = new Error("EMAIL_IS_NOT_VALID");
    err.statusCode = 409;
    throw err;
  }
};

module.exports = { emailValidationCheck, passwordValidationCheck };
