require("dotenv").config()

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

//Create a user
app.post('/users_signup', async function(req, res, next) {
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

//Create a post
app.post('/user_posts_register', async function(req, res, next) {
    const { user_id, title, content, imageUrl } = req.body

    await dataSource.query(
        `INSERT INTO posts (
            user_id,
            title,
            content,
            imageUrl
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`, [user_id, title, content, imageUrl]
    );

    res.status(201).json({message : "postGetSuccess"});
})

//Get all posts
app.get('/user_posts_view', async function(req, res, next) {
    const posts = await dataSource.query(
        `SELECT
            posts.user_id as userId,
            users.profileImage as userProfileImage,
            posts.id as postingId,
            posts.imageUrl as postingImageUrl,
            posts.content as postingContent
        FROM posts
        INNER JOIN users ON posts.user_id = users.id;`
            
        ) 
        res.status(200).json({message : "postCreated", data: posts});
    })

const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`server listening on port ${PORT}`)
})