const dataSource = require("./dataSource");

const createUser = async (email, password, name, age, phoneNumber) => {
  try {
    return await dataSource.query(
      `
                INSERT INTO users (
                    email,
                    password,
                    name,
                    age,
                    phone_number
                ) VALUES (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `,
      [email, password, name, age, phoneNumber]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await dataSource.query(
      `SELECT
            u.password,
            u.id
        FROM users u
        WHERE u.email = ?
        `,
      [email]
    );
    return result[0];
  } catch (err) {
    const error = new Error("errrrrror");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
};
