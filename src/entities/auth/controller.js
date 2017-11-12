import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import bcrypt from 'bcryptjs';

const User = mongoose.model('User');

export const login = ({Email, Password}) => {
  return new Promise((resolve, reject) => {
    User.findOne( {Email},{Password} , (err,result) => {
      if(err) return reject(500);
      bcrypt.compare(Password, result.Password, (error, isMatch) =>{
          if(error) return reject(500);
          else if (!isMatch) return reject(404);
          return resolve(result._id);
      });
      
    });
  });
}