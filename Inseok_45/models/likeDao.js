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

const checkLike = async ( userId, postId ) => {
    try {
        const newLike = await dataSource.query(
            `SELECT
            EXISTS
            (SELECT *
                FROM likes
                WHERE user_id = ? AND post_id = ?)
            `, [ userId, postId ]
        );
        
        return Number(Object.values(newLike[0]));

    } catch (err) {
        const error = new Error('could not check db');
        error.statusCode = 500;
        throw error;
    }
};

const createLike = async ( userId, postId ) => {
    try {
        await dataSource.query(
            `INSERT INTO likes(
                user_id,
                post_id
            ) VALUE ( ?, ?)
            `, [ userId, postId ]   
        );
    } catch (err) {
        const error = new Error('Error while trying to like');
        error.statusCode = 400;
        throw error;
    }
}

const deleteLike = async ( userId, postId ) => {
    try {
        await dataSource.query(
            `DELETE FROM
            likes
            WHERE
            user_id = ? AND post_id = ?
            `, [ userId, postId ]   
        );
    } catch (err) {
        const error = new Error('Error while trying to unlike');
        error.statusCode = 500;
        throw error;
    }
}



module.exports = { checkLike, createLike, deleteLike };