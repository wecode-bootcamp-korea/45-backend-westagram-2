const postService = require('../services/postService');
const { validateToken } = require('../middlewares/validate-jwt');

const createPosts = async ( req, res ) => {
    
    try {
        const { userId, postImage, postParagraph } = req.body
        const id = req.user;
        console.log("inside controller " + id);
        console.log("userId = " + userId);
        
        if( userId !== id ) return res.status(400).json({ message: "Invalid User" });
        if( !userId || !postImage ) return res.status(400).json({ message: "Cannot Create Post" });
    
        await postService.createPosts(id, postImage, postParagraph);
        return res.status(201).json({ message: "Post Created" });
        
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message });
    };
};

const getAllPosts = async ( req, res ) => {
    try {
        const allPost = await postService.getAllPosts();
        return res.status(200).json(allPost);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Cannot get posts" });
    }
}

const getUserPosts = async ( req, res ) => {
    try {
        const { userId } = req.body;

        if( !userId )
            return res.status(400).json({ 
                message: "Cannot Find Data" 
            });

        const userPost = await postService.getUserPosts( userId );
        return res.status(200).json(userPost);
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ 
            message: err.message 
        });
    };
};

const deletePosts = async ( req, res ) => {
    try {
        const { userId, postId } = req.body;

        if ( !userId || !postId ) 
            return res.status(400).json({
                message: "Cannot Find Post"
            })
        
        await postService.deletePosts( userId, postId );
        return res.status(200).json({
            message: "Post Deleted"
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ 
            message: err.message 
        });
    };
}

const editPosts = async ( req, res ) => {
    try {
        const { userId, postId, postContent } = req.body;

        if ( !userId || !postId || !postContent)
            return res.status(400).json({
                message: "Cannot Edit Post"
            })
        
        await postService.editPosts( userId, postId, postContent );
        return res.status(200).json({
            message: "Post Edited"
        });
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message
        })
    }
}



module.exports = { createPosts, getAllPosts, getUserPosts, editPosts, deletePosts };