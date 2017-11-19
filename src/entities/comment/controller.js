import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import fs from 'fs';
import mv from 'mv';

const Post = mongoose.model('Post');

export const getComment = ( { Pid, _id} ) => {
  return new Promise((resolve, reject) =>{
    Post.findOne( 
      { $and :[ { _id : Pid }, { "comments._id" :_id } ]}, 
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

export const createComment = (author,{uuid, content}, {Pid}) => {
  return new Promise((resolve, reject) => {
    const embed = 
      {$push:
        {
          comments: 
            {
              _id: uuid,
              author: author,
              content: content,
              timestamp: new Date(),
              likeCount:0
            }
        }
      }

    Post.update( { "_id" : Pid} , embed ,(err, result) => {
      if(err) return reject(500);
      else return resolve(uuid);
   });
  })  
};


