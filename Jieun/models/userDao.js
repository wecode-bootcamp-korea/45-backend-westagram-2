const dataSource = require("./dataSource");

const createUser = async (name, profileImage, email, password, phoneNumber) => {
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
      [name, profileImage, email, password, phoneNumber]
    );
  } catch (err) {
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
        user_id
        FROM posts
        WHERE user_id = ?
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

module.exports = {
  createUser,
  isUserExisted,
};
