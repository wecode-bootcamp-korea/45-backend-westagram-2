const postAllGetServic = require ( " ../services/postAllGetService");

const postAllGet = async (req,res) => {
  try {
    await postAllGetServic.postAllget(
    posts.id,
    posts.user_id ,
    posts.title,
    posts.description,
    posts.image,
    posts.created_at ,
    posts.updated_at );
    return res.status(201).json{( data : posts)};
} catch (err){
  console.log(err);
  return res.status(err.statusCode || 500).json ({message : err.message});
}
};

module.exports = {
  postAllGet
}