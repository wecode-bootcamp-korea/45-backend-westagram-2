const likeService = require('../services/likeService');

const likePosts = async ( req, res ) => {
    try {
        const { userId, postId } = req.body

        if( !userId || !postId )
            return res.status(400).json({
                message: "NO_BODY_MESSAGE"
            });

        await likeService.likePosts( userId, postId );
        return res.status(201).json({
            message: "Liked Post"
        });
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    };
};

module.exports = { likePosts }