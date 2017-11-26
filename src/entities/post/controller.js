import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import fs from 'fs';
import mv from 'mv';

const Post = mongoose.model('Post');
const User = mongoose.model('User');

export const getAllPost = () => {
  return new Promise((resolve, reject) => {
    Post.find({}, (err,results) => {   
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
    
  });
}

export const getAllPostofUser = ({ Cid }) => {
  return new Promise((resolve, reject) => {
    Post.find({ "author" : Cid }, (err,results) => {   
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
  });
}

export const getPostofUser = ({ Cid , _id}) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ "author" : Cid , "_id" : _id }, (err,result) => {
      if(err) return reject(500);
      else return resolve(result);
    });
  });
}

export const getPost = ({_id}) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ _id }, (err,result) => {
      if(err) return reject(500);
      else return resolve(result);
    });
  });
}

export const deletePost = ({ _id }) => {   
  return new Promise((resolve, reject) => {   
    Post.remove({ _id }, (err) => {   
      if(err) return reject(500);   
      return resolve();   
    });   
  });   
};

export const unlinkImage = ({ _id}) => {
  Post.findOne({_id}, (err,results) => {
    if(err) console.log('unable to delete image')
    fs.unlink(JSON.parse((JSON.stringify(results.imagePath))));
  });  
};


export const attachImage = (filename,folder, {image} ) => {
  return new Promise((resolve, reject) =>{
    if({image} === null) return resolve(null);
    const imgurl = folder + filename +'.jpg';
    const Path = __dirname + imgurl;
    image.mv(Path,(err) =>{
      if(err) return resolve(null);
      return resolve(imgurl);

    });
  })
}


export const checkAction = ({ _id }, {action},  id ) => {
  return new Promise((resolve,reject) => {
    User.findOne({ $and : [{'_id' : id},{ "likedPosts" : {$in : [ _id ]}}]}, (err,result) => {
      if(err) return reject(500);
      else{
        if(!result && action === 'UNLIKE') return reject(409);
        else if (result && action === 'LIKE') return reject(409);
        return resolve();
      }

    });
  });
}

export const likePost = ({ _id },{ action },prevLikes) => {
  return new Promise((resolve,reject) => {
    const likes = action === 'LIKE'? prevLikes += 1 : prevLikes -= 1;
    Post.update( 
      { _id: _id},
      { $set : { likeCount: likes }},
      (err,result) => {
        if (err) return reject(500);
        return resolve();
    });
  });
};

export const updateLikedPost = ({ _id}, {action} , {user}) => {
  return new Promise((resolve,reject) => {
    User.update({ "_id" : user },action === 'LIKE' ?  {  $addToSet: {likedPosts: _id } } : {$pull : {likedPosts : _id}} ,
        (err,result) => {
          console.log(result);
      if(err) reject(500);
      return resolve();
    });
  });
}

export const createPost = (author,{ uuid, content, imgurl}) => {
  return new Promise((resolve, reject) => {
    const post = {
      uuid: uuid,
      author: author,
      content: content,
      timestamp: new Date(),
      likeCount: 0,
      comments: [],
      imageUrl: imgurl
    }

    const newPost = new Post(post);
    newPost.save((err, results) => {
      if(err) return reject(500);
      else return resolve(results._id);
    });
  })  
};



