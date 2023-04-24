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

const post = async ( userId, postImage, postParagraph ) => {
    try {
        return await dataSource.query(
            `INSERT INTO posts(
                user_id,
                post_image,
                post_paragraph
            ) VALUES ( ?, ?, ?)`, [ userId, postImage, postParagraph ]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode(500);
        throw error;
    };
};


module.exports = { post };