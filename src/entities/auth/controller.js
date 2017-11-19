import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import bcrypt from 'bcryptjs';

const User = mongoose.model('User');

export const login = ({email, password}) => {

  return new Promise((resolve, reject) => {

    User.findOne({email}, (err,result) => {
      if(err) return reject(500);
      else if(!result) return reject(422);
      bcrypt.compare(password, result.password, (error, isMatch) =>{
          if(error) return reject(500);
          else if (!isMatch) return reject(422);
          return resolve(result._id);
      });
      
    });
  });
}