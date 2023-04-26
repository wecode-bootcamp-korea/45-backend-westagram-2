const dataSource = require("./dataSource");

const createUser = async (email, password, description, profileImg) => {
  try {
    await dataSource.query(
      `INSERT INTO users (
          email,
          password,
          description,
          profile_image
        ) VALUES (?,?,?,?);
        `,
      [email, password, description, profileImg]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const login = async (email) => {
  try {
    return await dataSource.query(
      `SELECT
      id,
      password
      FROM users
      WHERE users.email = ?`,
      [email]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const searchUserPost = async (userId) => {
  try {
    return await dataSource.query(
      `SELECT
      users.id,
      users.email,
      users.profile_image,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          "postUsersId" , posts.user_id,
          "postTitle" , posts.title,
          "postDescription" , posts.description,
          "postImage", posts.image,
          "postId", posts.id
        ) 
        )as posting
      FROM users
      JOIN posts ON users.id = posts.user_id
      WHERE users.id = ?
      GROUP BY users.id `,
      [userId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const updateUserPost = async (description, userId, postId) => {
  try {
    return await dataSource.query(
      `UPDATE posts
      SET
      description = ?
      WHERE user_id = ? AND id =?
      `,
      [description, userId, postId]
    );
  } catch (err) {
    console.log(err);
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
  searchUserPost,
  updateUserPost,
  login,
};
