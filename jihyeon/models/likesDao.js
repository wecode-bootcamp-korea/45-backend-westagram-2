const dataSource = require("./dataSource");

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
    }

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
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  likes,
};
