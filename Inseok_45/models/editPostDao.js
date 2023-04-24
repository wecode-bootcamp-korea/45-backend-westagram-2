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
        console.log("Data source not initialized : ", err);
            dataSource.destroy();
    });

const changePosts = async ( userId, postId, postContent) => {
    try {
        return await dataSource.query(
            `UPDATE
              posts 
            SET post_paragraph = ?
            WHERE posts.user_id = ? && posts.id = ?
            `, [ postContent, userId, postId ]
        ); 
    } catch (err) {
        const error = new Error('CANNOT_UPDATE_DATA');
        error.statusCode = 500;
        throw error;
    }
}


module.exports = { changePosts };