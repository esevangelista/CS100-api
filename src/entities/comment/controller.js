import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import fs from 'fs';
import mv from 'mv';

const Post = mongoose.model('Post');
const User = mongoose.model('User');


export const getComment = ( { Pid, _id} ) => {
  return new Promise((resolve, reject) =>{
    Post.findOne( 
      { $and :[ { _id : Pid }, { "comments._id" : _id } ]}, 
      {"comments.$":1} ,(err,result) => {
        if(err) return reject(500);
        return resolve(result.comments[0]);
    });
  });
}

export const deleteComment = ({ Pid , _id}) =>{
  return new Promise((resolve, reject) =>{
    Post.findByIdAndUpdate( 
      Pid ,
      {$pull:{comments:{"_id":_id}}},
      {"comments.$":1} ,
      (err,result) => {
        if(err) return reject(500);
        return resolve();
   
    });
  });
}

export const checkAction = ({ Pid,_id }, {action},  id ) => {
  return new Promise((resolve,reject) => {
    User.findOne({ $and : [{'_id' : id},{ "likedComments" : {$in : [ _id ]}}]}, (err,result) => {
      if(err) return reject(500);
      else{
        if(!result && action === 'UNLIKE') return reject(409);
        else if (result && action === 'LIKE') return reject(409);
        return resolve();
      }
    });
  });
}

export const likeComment = ({ Pid, _id },{ action }, prevLikes) => {
  return new Promise((resolve,reject) => {
    const likes = action === 'LIKE'? prevLikes+=1:prevLikes-=1;
    Post.update( 
      { _id: Pid, comments : { $elemMatch : {'_id':_id}}},
      { $set : { "comments.$.likeCount": likes }},
      (err,result) => {
        if(err) return reject(500);
        return resolve();
   
    });
  });
};

export const updateLikedComment = ({ Pid, _id}, {action} , {user}) => {
  return new Promise((resolve,reject) => {
    User.update({ "_id" : user },action === 'LIKE' ?  {  $addToSet: {likedComments: _id } } : {$pull : {likedComments : _id}} ,
        (err,result) => {
          console.log(result);
      if(err) reject(500);
      return resolve();
    });
  });
}
export const createComment = (author,{content,authorName,authorImg}, {Pid}) => {
  return new Promise((resolve, reject) => {
    const embed = 
      {$push:
        {
          comments: 
            {
              author: author,
              authorName: authorName,
              authorImg: authorImg,
              content: content,
              timestamp: new Date(),
              likeCount:0
            }
        }
      }

    Post.update( { "_id" : Pid} , embed ,(err, result) => {
      if(err) return reject(500);
      else return resolve();
   });
  })  
};



