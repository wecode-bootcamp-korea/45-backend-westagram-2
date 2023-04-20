require('dotenv').config();

const morgan = require ('morgan');
const express = require('express');
const cors = require('cors');
const { DataSource } = require('typeorm');

const dataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.log("Error during Data Source initialization", err)
    })

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/ping', function (req, res){
    return res.status(200).json({message: 'pong'})
});


app.post('/users/signup', async function (req, res) {
    const { email, password, name, age, phoneNumber } = req.body

    if (!email || !password || !name){
        return res.status(400).json({message: 'KEY_ERROR'});
    }

    await dataSource.query(`
        INSERT INTO users (
            email,
            password,
            name,
            age,
            phone_number
        ) VALUES (
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `,[ email, password, name, age, phoneNumber ])

    res.status(201).json({message: 'userCreated'})
});

app.post('/users/:userId/posting', async function (req, res) {
    const { postContent, postImage } = req.body
    const { userId } = req.params

    await dataSource.query(`
        INSERT INTO posts (
            user_id,
            post_content,
            post_image
        ) VALUES (
            ?,
            ?,
            ?
        )
    `,[ userId, postContent, postImage ])

    res.status(201).json({message: 'postCreated'})
});

app.post('/users/:userId/likes/:postId', async function (req, res) {
    const { userId, postId } = req.params

    await dataSource.query(`
        INSERT INTO likes (
            user_id,
            post_id
        ) VALUES (
            ?,
            ?
        )
    `,[ userId, postId ])

    res.status(201).json({message: 'likeCreated'})
});

app.get('/posts/viewall', async function (req, res){
    await dataSource.query(
        `SELECT
            u.id AS user_id,
            p.id AS post_id,
            p.post_image,
            p.post_content
        FROM posts p 
        INNER JOIN users u ON p.user_id = u.id`
                , function (err, rows) {
        res.status(200).json(rows);
          });
});

app.get('/users/:userId/posts', async function (req, res){
    const { userId } = req.params;
    
    const [ showPosts ] = await dataSource.query(
        `SELECT
            u.id as user_id,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    "post_id", p.id,
                    "post_image", p.post_image,
                    "post_content", p.post_content
              )
            ) as posts
        FROM users u 
        JOIN posts p ON p.user_id = u.id
        WHERE u.id = ?
        GROUP BY u.id`, [ userId ]
    );

    return res.status(200).json({data : showPosts})
});

app.put('/users/:userId/posts/:postId/update', async function (req, res){
    const { userId, postId } = req.params
    const { postImage, postContent } = req.body

    await dataSource.query(
        `UPDATE users u INNER JOIN posts p
         ON u.id = p.user_id
            SET
                post_image = ?,
                post_content = ?
            WHERE u.id = ? AND p.id = ?
        `,
        [ postImage, postContent, userId, postId ]
    );
    
     const [result] = await dataSource.query(
        `SELECT
            u.id as userId,
            u.name as userName,
            p.id as postingId,
            p.post_image as postingImage,
            p.post_content as postingContent
        FROM users AS u 
        JOIN posts p ON p.user_id = u.id
        WHERE u.id = ? AND p.id = ?
        `, [ userId, postId ]
    );
    
    res.status(200).json({ data : result })
});

app.delete('/users/:userId/posts/delete/:postId', async function (req, res){
    const { userId, postId } = req.params
    
    await dataSource.query(
        `DELETE FROM posts p 
            WHERE p.user_id = ? AND p.id = ?
        `, [ userId, postId ]
    );

    res.status(201).json({ message: "postingDeleted" })
});

const PORT = process.env.PORT;

const start = async () => {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start()