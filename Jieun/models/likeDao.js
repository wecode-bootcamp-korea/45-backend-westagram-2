const dataSource = require("./dataSource");

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
