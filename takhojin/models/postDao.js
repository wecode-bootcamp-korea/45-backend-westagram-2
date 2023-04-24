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

const createPost = async (title, description, image, userId) => {
  try {
    return await dataSource.query(
      `INSERT INTO posts(
        title,
        description,
        image,
        userId
      ) VALUES ( ? , ? , ? , ?);
      `,
      [title, description, image, userId]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createPost,
};
