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
  const { title, description, image, userId } = req.body;

  await dataSource.query(
    `INSERT INTO posts(
      title,
      description,
      image,
      userId
    ) VALUES ( ? , ? , ? , ?);
    `,
    [title, description, image, userId]
  );

  res.status(201).json({ message: " postsCreated " });
});

app.get("/posts", async (req, res) => {
  const posts = await dataSource.query(
    `SELECT
       posts.id,
       posts.user_id ,
       posts.title,
       posts.description,
       posts.image,
       posts.created_at ,
       posts.updated_at 
       FROM posts`
  );

  res.status(200).json({ data: posts });
});

app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const posts = await dataSource.query(
    `SELECT
      users.id as usersId,
      users.email as usersEmail,
      users.profile_image as usersProfileImage,
       JSON_ARRAYAGG(
        JSON_OBJECT(
          "postUsersId" , posts.user_id,
          "postTitle" , posts.title,
          "postDescription" , posts.description,
          "postImage", posts.image,
          "postId", posts.id
        )
       ) as posting
      FROM users 
      JOIN posts ON users.id = posts.user_id 
      WHERE users.id = ? 
      GROUP BY users.id `,
    [userId]
  );

  res.status(200).json({ data: posts });
});

app.patch("/user/:userId/posts/:postId", async (req, res) => {
  const { description } = req.body;
  await dataSource.query(
    `UPDATE posts
      SET
       description = ?`,
    [description]
  );
  const { userId, postId } = req.params;

  const [posts] = await dataSource.query(
    `SELECT 
      JSON_OBJECT(
        "userId" , users.id ,
        "postUserId" , posts.user_id ,
        "postTitle" , posts.title ,
        "postDesc" , posts.description 
      ) AS posts
      FROM users
      JOIN posts ON users.id = posts.user_id
      WHERE users.id = ? and posts.id = ?`,
    [userId, postId]
  );
  res.status(200).json({ data: posts });
});

app.delete("/posts/:postId", async (req, res) => {
  const { postId } = req.params;

  await dataSource.query(
    `DELETE FROM posts
      WHERE posts.id = ?`,
    [postId]
  );
  res.status(204).send();
});

const PORT = process.env.PORT;

const start = async () => {
  app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();
