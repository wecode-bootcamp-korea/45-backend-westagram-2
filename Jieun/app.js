require("dotenv").config(); //환경변수 등록

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })

const app = express(); 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.post('/users/signup', async function(req, res, next) {
    const { name, email, password, phoneNumber } = req.body

    await dataSource.query(
        `INSERT INTO users (
            name,
            email,
            password,
            phoneNumber
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`, [name, email, password, phoneNumber]
    );

    res.status(201).json({message : "userCreated"});
})


const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`server listening on port ${PORT}`)
})