const { DataSource } = require("typeorm");

const dataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log("Error during Data Source initialization", err);
  });

const likes = async (userId, postId) => {
  try {
    const isExists = await dataSource.query(
      `
                SELECT EXISTS (
                    SELECT * FROM likes 
                    WHERE (
                      user_id = ? AND post_id = ?
                    )
                )
        `,
      [userId, postId]
    );

    if (Object.values(isExists[0]) == 1) {
      await dataSource.query(
        `
                DELETE FROM likes
                WHERE user_id = ? AND post_id = ?
          `,
        [userId, postId]
      );
      return false;
    } else {
      await dataSource.query(
        `
                INSERT INTO likes (
                    user_id,
                    post_id
                ) VALUES (
                    ?,
                    ?
                )
          `,
        [userId, postId]
      );
      return true;
    }
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  likes,
};
