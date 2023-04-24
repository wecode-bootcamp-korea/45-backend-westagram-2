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

const createLikes = async (userId, postId) => {
  try {
    const likeExists = await dataSource.query(
      `SELECT EXISTS(
        SELECT
        user_id,
        post_id
        FROM likes
        WHERE user_id = ? AND post_id = ?
        )
        `,
      [userId, postId]
    );
    if (Object.values(likeExists[0]) == 0) {
      const createLike = await dataSource.query(
        `INSERT INTO likes(
          user_id,
          post_id
          ) VALUES (
            ?,
            ?
            )`,
        [userId, postId]
      );
      return createLike;
    } else {
      const deleteLike = await dataSource.query(
        `DELETE
        FROM likes
        WHERE user_id = ? AND post_id = ?;
        `,
        [userId, postId]
      );
      return deleteLike;
    }
  } catch (err) {
    console.log("duplicateData: ", err);
    res.status(400).json({ message: "duplicateData" });
  }
};

module.exports = {
  createLikes,
};
