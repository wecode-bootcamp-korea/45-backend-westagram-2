const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");
const dataSource = require("./models/dataSource");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(routes);

const PORT = process.env.PORT;

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

const start = async () => {
  try {
    dataSource
      .initialize()
      .then(() => {
        console.log("Data Source has been initialized");
      })
      .catch((err) => {
        console.log("Error occurred during Data Source initialization", err);
        dataSource.destrou();
      });

    app.listen(PORT, () => console.log(`Server is listning on ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

start();
