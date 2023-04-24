const likeDao = require('../models/likeDao');

const likePosts = async ( userId, postId ) => {
    try {
        const result = await likeDao.checkLike(userId, postId);

        if(result === 0) {
            await likeDao.createLike(userId, postId);

            return "Like Successful"
        } else {
            await likeDao.deleteLike(userId, postId);

            return "Unlike Successful"
        }
    } catch (e) {
        const error = new Error('CANNOT_PROCESS_REQUEST');
        error.statusCode = 400;
        throw error;
    }
     

};


module.exports = { likePosts };