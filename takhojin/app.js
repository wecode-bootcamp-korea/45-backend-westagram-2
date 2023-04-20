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

app.get("/posts", async (req, res) => {
  await dataSource.query(
    `SELECT
       posts.id,
       posts.user_id ,
       posts.title,
       posts.description,
       posts.image,
       posts.created_at ,
       posts.updated_at 
       FROM posts`,
    (err, rows) => {
      res.status(200).json(rows);
    }
  );
});

app.get("/users/:post", async (req, res) => {
  const posts = await dataSource.query(
    `SELECT
      users.id as users_id,
      users.email as users_email,
      users.profile_image as users_profileImage,
       JSON_ARRAYAGG(
        JSON_OBJECT(
          "post_users_id" , posts.user_id,
          "post_title" , posts.title,
          "post_description" , posts.description,
          "post_image", posts.image
        )
       ) as posting
      FROM users
      JOIN posts ON users.id = posts.user_id 
      GROUP BY users_id`
  );

  res.status(200).json({ data: posts });
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
