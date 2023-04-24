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

const createUser = async (email, password, description, profile_img) => {
  try {
    return await dataSource.query(
      `INSERT INTO users (
          email,
          password,
          description,
          profile_img
        ) VALUES (?,?,?,?);
        `,
      [email, password, description, profile_img]
    );
  } catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
