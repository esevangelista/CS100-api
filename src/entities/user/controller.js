import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import bcrypt from 'bcryptjs';

const User = mongoose.model('User');
const salt = bcrypt.genSaltSync(10);

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, (err,results) => {
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
    
  });
}
export const getUser = ({ _id }) => {
  return new Promise((resolve, reject) =>{
    User.findOne({ _id }, (err,result) => {
      if(err) return reject(500);
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



export const updateUser = ({ _id },{ Name, Email, Password, About}) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(Password, salt, function(err, hash) {
      const user = {
        Name: Name,
        Email: Email,
        About: About,
        Password: hash
      }  
      const newUser = new User(user);
      User.update({ _id },user,(err, results) => {
          if(err) return reject(500);
          else return resolve();
      });
    })  
  });
}


