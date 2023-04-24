 const createPostDao = require('../models/createPostDao');
const getPostDao = require('../models/getPostDao');
const getPosts = require('../models/getPostDao');
const deletePostDao = require('../models/deletePostDao');
const editPostDao = require('../models/editPostDao')

const createPosts = async ( userId, postImage, postParagraph ) => {
    const post = await createPostDao.post(
        userId,
        postImage,
        postParagraph
    );

    return post;
};

const getAllPosts = async ( ) => {
    try {
        const allPost = await getPostDao.getAllPosts();
        return allPost;
    } catch (err) {
        const error = new Error('Could not get post');
        error.statusCode = 404;
        throw error;
    }
};

const getUserPosts = async ( userId ) => {
    try {
        const userPost = await getPostDao.getUserPosts(
            userId
        );
        return userPost;
    } catch (err) {
        const error = new Error('Could not get post');
        error.statusCode = 404;
        throw error;
    }
}

const deletePosts = async ( userId, postId ) => {
    try {
        const deletePost = await deletePostDao.deletePost(
            userId,
            postId
        );
        return deletePost;
    } catch(err){
        const error = new Error('Could not delete post');
        error.statusCode = 404;
        throw error;
    }

};

const editPosts = async ( userId, postId, postContent ) => {
    return await editPostDao.changePosts(
        userId,
        postId,
        postContent
    );
}

module.exports = { createPosts, getAllPosts, getUserPosts, editPosts, deletePosts }


