const dataSource  = require('./dataSource');

const createPosts = async ( id, postImage, postParagraph ) => {
    try {
        return await dataSource.query(
            `INSERT INTO posts(
                user_id,
                post_image,
                post_paragraph
            ) VALUES ( ?, ?, ?)`, [ id, postImage, postParagraph ]
        );
        } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode(500);
        throw error;
    };
};

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

const deletePost = async ( userId, postId ) => {
    try {
        return await dataSource.query(
            `DELETE
            FROM posts
            WHERE posts.user_id = ? AND posts.id = ?
            `, [userId, postId]
        );
    } catch (err) {
        const error = new Error('CANNOT_DELETE_POST');
        error.statusCode(500);
        throw error;
    };

};

const changePosts = async ( userId, postId, postContent) => {
    try {
        console.log(postContent);
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


module.exports = { createPosts, getAllPosts, getUserPosts, deletePost, changePosts };