import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import bcrypt from 'bcryptjs';
import * as Util from './../signup/controller';
import fs from 'fs';


const User = mongoose.model('User');
const salt = bcrypt.genSaltSync(10);

export const getAllUsers = ({page}) => {
  return new Promise((resolve, reject) => {
    User.find({}, (err,results) => {         
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    })
  });
}
export const getUser = ({ _id }) => {
  return new Promise((resolve, reject) =>{
    User.findOne(_id, (err,result) => {
      if(err) return reject(500);
      else return resolve(result);

    });
  });
}

export const searchUser = ({ name }) => {
  return new Promise((resolve, reject) =>{
    User.findOne({ name: name }, (err,result) => {
      if(err) return reject(500);
      else if (!result) return reject(404);
      else return resolve(result);
    });
  });
}


export const deleteUser = ({ _id }) => {   
  return new Promise((resolve, reject) => {   
    User.remove({ _id }, (err) => {   
      if(err) return reject(500);   
      return resolve();   
    });   
  });   
};


export const unlinkImage = ({ _id }) => {

  User.findOne({_id}, (err,results) => {
    if(err) console.log('unable to delete image')
    fs.unlink(JSON.parse((JSON.stringify(results.imagePath))));
  });  

};
export const updateUser = ({ _id },{ name, email, password, about}) => { 
  return new Promise((resolve, reject) => {  
    bcrypt.hash(password, salt, function(err, hash) {
       const user = {
        name: name,
        email: email,
        about: about,
        password: hash
        
      }
      const newUser = new User(user);
      User.update(_id,user,(err, results) => {
          if(err) return reject(500);
          else return resolve();
      });
    })
  });
}

export const updatePW = ({ _id },{ password }) => {
  return new Promise((resolve, reject) => {  
    bcrypt.hash(password, salt, function(err, hash) {
      User.update({ _id },{$set : { password : hash}},(err, results) => {
          if(err) return reject(500);
          else return resolve();
      });
    })  
  });
}

export const verify = ({_id },{password}) => {

  return new Promise((resolve, reject) => {

    User.findOne({_id}, (err,result) => {
      if(err) return reject(500);
      else if(!result) return reject(422);
      bcrypt.compare(password, result.password, (error, isMatch) =>{
          if(error) return reject(500);
          else if (!isMatch) return reject(422);
          return resolve();
      });
      
    });
  });
}

