require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { DataSource } = require("typeorm");

const app = express();

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
  .catch((error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

app.post("/users", async (req, res, next) => {
  const { email, password, description, profileImage } = req.body;

  await dataSource.query(
    `INSERT INTO users(
      email,
      password,
      description,
      profie_img
    ) VALUES (? , ? , ?, ?);
    `,
    [email, password, description, profileImage]
  );

  res.status(201).json({ mesasage: " userCreated " });
});

app.post("/posts", async (req, res, next) => {
  const { title, description, image, user_id } = req.body;

  await dataSource.query(
    `INSERT INTO posts(
      title,
      description,
      image,
      user_id
    ) VALUES ( ? , ? , ? , ?);
    `,
    [title, description, image, user_id]
  );

  res.status(201).json({ message: " postsCreated " });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
