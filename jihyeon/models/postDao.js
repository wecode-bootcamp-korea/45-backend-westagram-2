const dataSource = require("./dataSource");

const createPost = async (userId, postContent, postImage) => {
  try {
    return await dataSource.query(
      `
          INSERT INTO posts (
              user_id,
              post_content,
              post_image
          ) VALUES (
              ?,
              ?,
              ?
          )
      `,
      [userId, postContent, postImage]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deletePost = async (userId, postId) => {
  try {
    return await dataSource.query(
      `DELETE FROM posts
        WHERE (posts.user_id = ? AND posts.id = ?)
    `,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const updatePost = async (postImage, postContent, userId, postId) => {
  try {
    await dataSource.query(
      `UPDATE users u INNER JOIN posts p
         ON u.id = p.user_id
            SET
                post_image = ?,
                post_content = ?
            WHERE u.id = ? AND p.id = ?
        `,
      [postImage, postContent, userId, postId]
    );

    return await dataSource.query(
      `SELECT
        u.id as userId,
        u.name as userName,
        p.id as postingId,
        p.post_image as postingImage,
        p.post_content as postingContent
    FROM users AS u 
    JOIN posts p ON p.user_id = u.id
    WHERE u.id = ? AND p.id = ?
    `,
      [userId, postId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const viewPosts = async () => {
  try {
    return await dataSource.query(
      `SELECT
            u.id AS user_id,
            p.id AS post_id,
            p.post_image,
            p.post_content
        FROM posts p 
        INNER JOIN users u ON p.user_id = u.id`
    );
  } catch (err) {
    const error = new Error("errrrrror");
    error.statusCode = 500;
    throw error;
  }
};

const viewUserPosts = async (userId) => {
  try {
    return await dataSource.query(
      `SELECT
            u.id as user_id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "post_id", p.id,
                    "post_image", p.post_image,
                    "post_content", p.post_content
              )
            ) as posts
        FROM users u 
        JOIN posts p ON p.user_id = u.id
        WHERE u.id = ?
        GROUP BY u.id`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
  deletePost,
  updatePost,
  viewPosts,
  viewUserPosts,
};
