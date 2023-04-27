const dataSource = require("./dataSource");

const createPost = async (title, description, image, user_id) => {
  try {
    await dataSource.query(
      `INSERT INTO posts(
        title,
        description,
        image,
        user_id
      ) VALUES ( ? , ? , ? , ?);
      `,
      [title, description, image, user_id]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const postAllGet = async () => {
  try {
    return await dataSource.query(
      `SELECT
          id,
          user_id ,
          title,
          created_at ,
          updated_at,
          image
          FROM posts
          `
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const updatedPost = async (userId, postId) => {
  try {
    return await dataSource.query(
      `SELECT 
      JSON_OBJECT(
        "userId" , users.id ,
        "postUserId" , posts.user_id ,
        "postTitle" , posts.title ,
        "postDesc" , posts.description 
      ) AS posts
      FROM users
      JOIN posts ON users.id = posts.user_id
      WHERE users.id = ? and posts.id = ?`,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (postId) => {
  try {
    await dataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ?`,
      [postId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

const postLike = async (userId, postId) => {
  try {
    await dataSource.query(
      `INSERT IGNORE INTO likes(
        users_id ,
        posts_id 
      ) VALUES ( ? , ?)
      `,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  postAllGet,
  updatedPost,
  deletePost,
  postLike,
};
