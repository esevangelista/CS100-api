import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';

const User = mongoose.model('User');

export const checkUser = ( self, {_id}) => {
  return new Promise((resolve, reject) => {   
    User.findOne({ $and : [{'_id' : self},
      {$or: [{ "friends" : {$in : [ _id ]}},
      {"requests": {$in : [ _id ]}}]}]},
      (err,result) => {
      if(err) return reject(500);
      else if(!result) return resolve();
      else return reject(409);
    });
  });
};

export const addFriend = ( self, {_id}) => {
  return new Promise((resolve, reject) => {
    User.update({ "_id" : _id },{  $addToSet: {requests: self } } ,
        (err,result) => {
      if(err) reject(500);
      return resolve();
    });
  });
}

export const acceptRequest = ( self, {_id}) => {
  return new Promise((resolve, reject) => {
    User.update({ "_id" : self },{$addToSet: {friends: _id}} ,
        (err,result) => {
      if(err) reject(500);
    });  
    User.update({ "_id" : self },{$pull: {requests: _id}} ,
        (err,result) => {
      if(err) reject(500);
    });  
     User.update({ "_id" : _id },{$addToSet: {friends: _id}},
        (err,result) => {
      if(err) reject(500);
    });  

    return resolve();  

  });
} 

export const rejectRequest = (self, {_id}) => {
  return new Promise((resolve, reject) => {
    User.update({ "_id" : self },{$set : {$pull : {requests: _id}}},
        (err,result) => {
      if(err) reject(500);
      return resolve();
    });  
  });
};
export const suggestUser = () => {
  return new Promise ((resolve,reject) =>{
    User.aggregate([{$sample : {size: 3}}], (err,result) =>{
      if(err) return reject(500);
      return resolve(result);
    });
  })
}



