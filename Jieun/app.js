const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const dataSource = require("./models/dataSource");

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.log("Error occurred during Data Source initialization", err);
    dataSource.destroy();
  });

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
