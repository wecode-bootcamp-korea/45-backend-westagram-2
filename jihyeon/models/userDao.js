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

const createUser = async (email, password, name, age, phoneNumber) => {
  try {
    return await dataSource.query(
      `
                INSERT INTO users (
                    email,
                    password,
                    name,
                    age,
                    phone_number
                ) VALUES (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?
                )
            `,
      [email, password, name, age, phoneNumber]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  createUser,
};
