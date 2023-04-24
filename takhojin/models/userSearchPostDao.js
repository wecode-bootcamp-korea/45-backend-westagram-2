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
    console.log("Data Source has been initialized");
  })
  .catch((err) => {
    console.log("Error occurred during Data Source initialization", err);
    dataSource.destrou();
  });

const userSearchPost = async (req, res) => {
  try {
    return await dataSource.query(
      `SELECT
        users.id as usersId,
        users.email as usersEmail,
        users.profile_image as usersProfileImage,
         JSON_ARRAYAGG(
          JSON_OBJECT(
            "postUsersId" , posts.user_id,
            "postTitle" , posts.title,
            "postDescription" , posts.description,
            "postImage", posts.image,
            "postId", posts.id
          )
         ) as posting
        FROM users 
        JOIN posts ON users.id = posts.user_id 
        WHERE users.id = ? 
        GROUP BY users.id`,
      [userId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  userSearchPost,
};
