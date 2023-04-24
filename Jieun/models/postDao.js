const { DataSource } = require("typeorm");

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log("Error occurred during Data Source initialization", err);
    dataSource.destroy();
  });

const createPosts = async (userId, title, content, imageUrl) => {
  try {
    return await dataSource.query(
      `INSERT INTO posts (
          user_id,
          title,
          content,
          image_url
      ) VALUES (
          ?,
          ?,
          ?,
          ?
      )`,
      [userId, title, content, imageUrl]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    return await dataSource.query(
      `SELECT
            posts.user_id as userId,
            users.profile_image as userProfileImage,
            posts.id as postingId,
            posts.image_url as postingImageUrl,
            posts.content as postingContent
        FROM posts    return

        INNER JOIN users ON posts.user_id = users.id;`
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const getSpecificUserPosts = async (userId) => {
  try {
    return await dataSource.query(
      `SELECT
      users.id as userId,
      users.profile_image as userProfileImage,
      (
        SELECT
          JSON_ARRAYAGG(
            JSON_OBJECT(
              "postingId", posts.id,
              "postingImageUrl", posts.image_url,
              "postingContent", posts.content
            )
          )
        FROM posts
        JOIN users ON users.id = posts.user_id
        WHERE users.id = ?
      ) as postings
    FROM users
    WHERE users.id = ?;`,
      [userId, userId]
    );
  } catch (err) {
    console.lomodifyResultPostsg(err);
    const error = new Error("INVALID_DATA_INPUT");

    error.statusCode = 500;
    throw error;
  }
};

const modifyPosts = async (content, postId, userId) => {
  try {
    return await dataSource.query(
      `UPDATE posts
      SET content = ?
      WHERE posts.id = ? AND posts.user_id = ?;
  `,
      [content, postId, userId]
    );
  } catch (err) {
    console.lomodifyResultPostsg(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const modifyResultPosts = async (postId, userId) => {
  try {
    return await dataSource.query(
      `
      SELECT
        users.id as userId, 
        users.name as userName,
        posts.id as postingId,
        posts.title as postingTitle,
        posts.content as postingContent
      FROM posts
      JOIN users ON users.id = posts.user_id
      WHERE posts.id = ? AND posts.user_id = ?
      ;
      `,
      [postId, userId]
    );
  } catch (err) {
    console.lomodifyResultPostsg(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

const deleteResultPosts = async (postId, userId) => {
  try {
    const result = await dataSource.query(
      `DELETE
     FROM posts
     WHERE posts.id = ? AND posts.user_id = ?;
    `,
      [postId, userId]
    );
    if (!result.affectedRows) return result.affectedRows;
    else return result;
  } catch (err) {
    console.lomodifyResultPostsg(err);
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPosts,
  getAllPosts,
  getSpecificUserPosts,
  modifyPosts,
  modifyResultPosts,
  deleteResultPosts,
};
