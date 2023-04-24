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
    const [result] = await dataSource.query(
      `SELECT EXISTS(
        SELECT
        user_id,
        post_id
        FROM likes
        WHERE user_id = ? AND post_id = ?
        ) as existed
        `,
      [userId, postId]
    );

    const isExisted = !!parseInt(result.existed);

    if (!isExisted) {
      return await dataSource.query(
        `INSERT INTO likes(
          user_id,
          post_id
          ) VALUES (
            ?,
            ?
            )`,
        [userId, postId]
      );
    }
    return await dataSource.query(
      `DELETE
        FROM likes
        WHERE user_id = ? AND post_id = ?;
        `,
      [userId, postId]
    );
  } catch (err) {
    console.log("duplicateData: ", err);
    res.status(400).json({ message: "duplicateData" });
  }
};

module.exports = {
  createLikes,
};
