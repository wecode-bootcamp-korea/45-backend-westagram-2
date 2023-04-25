const postDao = require('../models/postDao');

const createPosts = async ( userId, postImage, postParagraph ) => {
    const post = await postDao.post(
        userId,
        postImage,
        postParagraph
    );

    return post;
};

const getAllPosts = async ( ) => {
    try {
        return postDao.getAllPosts();
    } catch (err) {
        const error = new Error('Could not get post');
        error.statusCode = 404;
        throw error;
    }
};

const getUserPosts = async ( userId ) => {
    try {
        return postDao.getUserPosts(
            userId
        );
    } catch (err) {
        const error = new Error('Could not get post');
        error.statusCode = 404;
        throw error;
    }
}

const deletePosts = async ( userId, postId ) => {
    try {
        return postDao.deletePost(
            userId,
            postId
        );
    } catch(err){
        const error = new Error('Could not delete post');
        error.statusCode = 404;
        throw error;
    }

};

const editPosts = async ( userId, postId, postContent ) => {
    return await postDao.changePosts(
        userId,
        postId,
        postContent
    );
}

module.exports = { createPosts, getAllPosts, getUserPosts, editPosts, deletePosts }


