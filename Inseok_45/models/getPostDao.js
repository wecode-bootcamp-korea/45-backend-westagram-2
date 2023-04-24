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
            dataSource.destroy();
    });

const getAllPosts = async ( ) => {
    try {
        const posts = await dataSource.query(
            `SELECT
                users.id as userId,
                posts.id as postingId,
                posts.post_image as postingImageUrl,                    
                posts.post_paragraph as postingContent
            FROM users                                      
            INNER JOIN posts ON posts.user_id = users.id`
        );

        return posts;

    } catch (err) {
        const error = new Error('CANNOT_FETCH_DATA');
        error.statusCode = 500;
        throw error;
    }
};

const getUserPosts = async ( userId ) => {
    try {
        return await dataSource.query(
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
            `, [ userId, userId ]
        );
    } catch (err) {
        const error = new Error('CANNOT_FETCH_DATA');
        error.statusCode = 500;
        throw error;
    }
}


module.exports = { getAllPosts, getUserPosts };