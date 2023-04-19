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


app.post('/users/sign-up', async (req, res, next) => {
    const { name, profileImage, email, password, phoneNumber } = req.body

    await dataSource.query(
        `INSERT INTO users (
            name,
            profile_image,
            email,
            password,
            phone_number
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


app.post('/posts/register', async (req, res, next) => {
    const { userId, title, content, imageUrl } = req.body

    await dataSource.query(
        `INSERT INTO posts (
            user_id,
            title,
            content,
            image_url
        ) VALUES (
            ?,
            ?,
            ?,
            ?
        )`, [userId, title, content, imageUrl]
    );

    res.status(201).json({message : "postCreated"});
})


app.get('/posts-view-all', async (req, res, next) => {
    const posts = await dataSource.query(
        `SELECT
            posts.user_id as userId,
            users.profile_image as userProfileImage,
            posts.id as postingId,
            posts.image_url as postingImageUrl,
            posts.content as postingContent
        FROM posts
        INNER JOIN users ON posts.user_id = users.id;`
            
        ) 
        res.status(200).json({message : "postGetSuccess", data: posts});
    }
)


app.get('/one-user-posts-view/user/:userId', async (req, res, next) => {
    
    const userId = req.params.userId;

    const posts = await dataSource.query(
        `SELECT
            users.id as userId,
            users.profile_image as userProfileImage,
            (
                SELECT
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        "postingId", posts.id,
                        "postingImageUrl", posts.image_url,
                        "postingContent", posts.content
                    )
                )
                FROM posts
                JOIN users ON users.id = posts.user_id
                WHERE users.id = ${userId}
            ) as postings         
            FROM users
            WHERE users.id = ${userId};`
        ) 
        res.status(200).json({message : "postGetSuccess", userId, data: posts});
    }
)

const PORT = process.env.PORT;

app.listen(PORT, function() {
    console.log(`server listening on port ${PORT}`)
})