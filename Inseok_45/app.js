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
});

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


app.post('/users/signup', async (req, res) => {
    const { firstName, lastName, email, phoneNumber, age, userName, password } = req.body

    await dataSource.query(
        `INSERT INTO users(
            first_name,
            last_name,
            email,
            phone_number,
            age,
            user_name,
            password
        ) VALUES ( ?, ?, ?, ?, ?, ?, ?)`, [firstName, lastName, email, phoneNumber, age, userName, password]
    );

    return res.status(201).json({ message: "sign-up complete" });
});

app.post('/users/post', async (req, res) => {
    const { userId, postImage, postParagraph} = req.body

    await dataSource.query(
        `INSERT INTO posts(
            user_id,
            post_image,
            post_paragraph
        ) VALUES ( ?, ?, ?)`, [userId, postImage, postParagraph]
    );

    return res.status(201).json({ message: "post created!" });
});

app.get('/users/post/view', async (req, res) => {
    const viewPost = await dataSource.query(
        `SELECT
          users.id as userId,
          posts.id as postingId,
          posts.post_image as postingImageUrl,
          posts.post_paragraph as postingContent
        FROM users
        INNER JOIN posts ON posts.user_id = users.id`
    );

    res.status(200).json({ data: viewPost });
});

app.get('/users/:userId/post/view', async (req, res, next) => {

    var userId = req.params.userId;

    const [userPost] = await dataSource.query(
        `SELECT
          users.id AS userId,
          (SELECT 
            JSON_ARRAYAGG(
            JSON_OBJECT(
                "postingId", posts.id,
                "postImageUrl", posts.post_image,
                "postContent", posts.post_paragraph
            ))
        FROM posts 
        WHERE posts.user_id = users.id AND users.id = ?
          ) AS postings
        FROM users
        WHERE users.id = ?
        `, [userId, userId]
    );

    return res.status(200).json({ data: userPost }); 
});






const port = process.env.PORT;
const start = async () => {
    app.listen(port, () => console.log(`Server is listening on ${port}`));
};

start();