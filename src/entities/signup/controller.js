import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import bcrypt from 'bcryptjs';
import mv from 'mv';

const User = mongoose.model('User');
const salt = bcrypt.genSaltSync(10);


export const checkEmail = ( email ) => {
  return new Promise((resolve, reject) =>{
    User.find({ email : email }, (err, result) => {
      if(err) return reject(500);
      else if (result.length !== 0 ) return reject(409);
      return resolve();
    });
  });
}

export const uploadPhoto = ({email}, folder, {image} ) => {
  console.log(image.name)
    const filename = email + '-' + image.name;
    const imgurl = folder + filename;
    const Path = __dirname + folder + filename ;
    const file ={
      imgurl : imgurl,
      Path : Path
    };

    image.mv(Path,(err) =>{
      if(err) return null;
    });
    return file;
}

export const createUser = ({ name, email , password, about}) => {
  //const file = uploadPhoto({ email }, '/profile-picture/', {image});
  return new Promise((resolve, reject) => {

    bcrypt.hash(password, salt, function(err, hash) {  
      const user = {
        name: name,
        email: email,
        about: about,
        password: hash
        //imageUrl : file.imgurl,
        //imagePath : file.Path
      }

      const newUser = new User(user);
      newUser.save((err, results) => {
         if(err) return reject(500);
         else return resolve(results._id);
      });
    })  
  });
}