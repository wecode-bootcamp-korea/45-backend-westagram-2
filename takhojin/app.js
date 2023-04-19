const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const { DataSource } = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

myDataSource.initialize().then(() => {
  console.log("Data source has been initialized");
});

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.post("/users", async (req, res, next) => {
  const { email, password, description, profie_img } = req.body;

  await myDataSource.query(
    `INSERT INTO users(
      email,
      password,
      description,
      profie_img
    ) VALUES (? , ? , ?, ?);
    `,
    [email, password, description, profie_img]
  );

  res.status(201).json({ mesasage: " userCreated " });
});

const start = async () => {
  app.listen(PORT, () => console.log(`sever is listening on ${PORT}`));
};

start();
