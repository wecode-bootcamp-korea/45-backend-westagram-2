require('dotenv').config();

const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');

const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

dataSource
    .initialize()
    .then(() => {
        console.log("Data source has been initialized!");
    }).catch((err) => {
        console.log("Data source Not Initialize : ", err);
    })

const app = express();    
app.use(express.json()); 
app.use(cors());
app.use(morgan('dev')); 

app.get('/ping', (req, res) => {
    res.status(200).json({ message: "pong" });
});

const port = process.env.PORT;
const start = async () => {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
};

start();
