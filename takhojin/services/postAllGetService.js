const postAllGetDao = require("../models/postAllGetDao");

const postAllGet = async (
  posts.id,
  posts.user_id ,
  posts.title,
  posts.description,
  posts.image,
  posts.created_at ,
  posts.updated_at ) => {
    const postSerch = await postAllGetDao.postAllGet(
      posts.id,
    posts.user_id ,
    posts.title,
    posts.description,
    posts.image,
    posts.created_at ,
    posts.updated_at
    );
    return postSerch
  };

  module.exports={
    postAllGet
  }