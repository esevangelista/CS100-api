import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import fs from 'fs';

const Post = mongoose.model('Post');


export const getAllPost = () => {
  return new Promise((resolve, reject) => {
    Post.find({}, (err,results) => {
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
    
  });
}

export const getAllPostofUser = ({ _id }) => {
  return new Promise((resolve, reject) => {
    Post.find({ "Author" : _id }, (err,results) => {
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
  });
}

export const getPostofUser = ({ Cid , _id}) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ "Author" : Cid , "_id" : _id }, (err,result) => {
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
    fs.unlink(JSON.parse((JSON.stringify(results.ImagePath))));
  });  
};

export const createPost = ({ Author },{Content}) => {
  return new Promise((resolve, reject) => {
    const post = {
      Author: Author,
      Content: Content,
      Timestamp: new Date(),
      LikeCount: 0,
      Comments: []
    }

    const newPost = new Post(post);
    newPost.save((err, results) => {
      if(err) return reject(500);
      else return resolve(results._id);
    });
  })  
}

