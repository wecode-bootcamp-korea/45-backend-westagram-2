const postService = require("../services/postService");

const postUp = async ( req, res )=> {
  try {
    const { title ,description, image , userId } = req.body;

    if ( !title || !description || !userId ){
      return res.status(400).json({message : "KEY_ERROR"});
    }
    await postService.postUp(title,description,image,userId);
    resturn res.status(201).json({message:"POSTUP_SUCCESS"});

  }catch(err){
    console.log( err );
    return res.status(err.statusCode || 500 ).json({message  : err.message});
  }
};

module.exports = {
  postUp
}