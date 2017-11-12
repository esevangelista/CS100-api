import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import bcrypt from 'bcryptjs';
import mv from 'mv';

const User = mongoose.model('User');
const salt = bcrypt.genSaltSync(10);


export const checkEmail = ( Email ) => {
  return new Promise((resolve, reject) =>{
    User.find({ "Email" : Email }, (err, result) => {
      if(err) return reject(500);
      else if (result.length !== 0 ) return reject(409);
      return resolve();
    });
  });
}

export const createUser = ({Name, Email , Password, About}, {Image}) => {
  return new Promise((resolve, reject) => {
    
    const filename = Email + '-' + Image.name;
    const Path = __dirname + '/profile_photos/' +  filename; 
    const imgurl = '/profile-picture/'+ filename;
    Image.mv(Path,(err) =>{
      if(err) return reject(500);
      console.log('uploaded');
    });

    bcrypt.hash(Password, salt, function(err, hash) {
      
      const user = {
        Name: Name,
        Email: Email,
        About: About,
        Password: hash,
        ImageUrl : imgurl,
        ImagePath : Path
      }
        
      const newUser = new User(user);
      newUser.save((err, results) => {
         if(err) return reject(500);
         else return resolve(results._id);
      });
    })  
  });
}