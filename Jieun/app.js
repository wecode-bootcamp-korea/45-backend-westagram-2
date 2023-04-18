require("dotenv").config();

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
    }).catch((err) => {
        console.log("Data Source Initialize Error : ", err)
    })

const app = express(); 

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res, next) {
    res.status(200).json({message: 'pong'})
})

app.post('/users/signup', async function(req, res, next) {
    const { name, profileImage, email, password, phoneNumber } = req.body

    await dataSource.query(
        `INSERT INTO users (
            name,
            profileImage,
            email,
            password,
            phoneNumber
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?
        )`, [name, profileImage, email, password, phoneNumber]
    );

    res.status(201).json({message : "userCreated"});
})

app.post('/user/posts/register', async function(req, res, next) {
    const { title, imageUrl, content } = req.body

    await dataSource.query(
        `INSERT INTO posts (
            title,
            imageUrl,
            content
        ) VALUES (
            ?,
            ?
        )`, [title, imageUrl, content]
    );

    res.status(201).json({message : "postCreated"});
})


const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`server listening on port ${PORT}`)
})