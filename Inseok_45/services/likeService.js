const likeDao = require('../models/likeDao');

const likePosts = async ( userId, postId ) => {
    try {
        const result = await likeDao.checkLike(userId, postId);

        if(!result) {
            await likeDao.createLike(userId, postId);

            return true;
        }
            await likeDao.deleteLike(userId, postId);

            return false;
        
    } catch (e) {
        const error = new Error('CANNOT_PROCESS_REQUEST');
        error.statusCode = 400;
        throw error;
    }

};


module.exports = { likePosts };