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

export const uploadPhoto = (Email, Folder, Image ) => {

    const filename = Email + '-' + Image.name;
    const imgurl = Folder + filename;
    const Path = __dirname + Folder+ filename ;
    const file ={
      imgurl : imgurl,
      Path : Path
    };
    console.log(file);

    Image.mv(Path,(err) =>{
      if(err) return null;
    });
    return file;
}

export const createUser = ({Name, Email , Password, About},{ Image }) => {
  const file = uploadPhoto(Email, '/profile-picture/', Image);

  return new Promise((resolve, reject) => {

    bcrypt.hash(Password, salt, function(err, hash) {  
      const user = {
        Name: Name,
        Email: Email,
        About: About,
        Password: hash,
        ImageUrl : file.imgurl,
        ImagePath : file.Path
      }

      const newUser = new User(user);
      newUser.save((err, results) => {
         if(err) return reject(500);
         else return resolve(results._id);
      });
    })  
  });
}