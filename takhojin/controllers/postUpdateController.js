const postUpdate = require ( " ../services/postUpdate");
const updatedPost = require ("../services/postUpdate");


const postUpdate = async (req, res) => {
  try{
    const {description}=req.body;

    if(!description){
      return res.status(400).json({ message : "KEY_ERROR"});
    }
    await postUpdate.postUpdate(description);
    return res.status(201).json({message:"UPDATE_SUCCESS"});

  } catch (err){
    console.log(err);
    return res.status(err.statusCode || 500).json ({ message : err.message });
  }
};

const updatedPost = async (req, res) = >{
  try{
    const { userId , postId } = req.params;

    if( !userId || !postId ){
      return res.status(400).json({ message : "KEY_ERROR"});
    }
    await updatedPost.updatedPost(userId,postId);
    return res.status(201).json({data:posts});
  } catch (err){
    console.log(err);
    return res.status(err.statusCode || 500).json ({ message : err.message });
  }
};

module.exports= {
  postUpdate,
  updatedPost,
}