const dataSource = require("./dataSource");

const createUser = async (
  name,
  profileImage,
  email,
  hashedPassword,
  phoneNumber
) => {
  try {
    return await dataSource.query(
      `INSERT INTO users (
        name,
        profile_image,
        email,
        password,
        phone_number
    ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?
    )`,
      [name, profileImage, email, hashedPassword, phoneNumber]
    );
  } catch (err) {
    console.log(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const isUserExisted = async (userId) => {
  try {
    const [result] = await dataSource.query(
      `SELECT EXISTS(
        SELECT
        id
        FROM users
        WHERE id = ?
      ) as existed`,
      [userId]
    );
    return !!parseInt(result.existed);
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    return dataSource.query(
      `SELECT
      id,
      password
      FROM users
      WHERE email =?
      `,
      [email]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  isUserExisted,
  getUserByEmail,
};
