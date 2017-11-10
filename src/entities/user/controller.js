import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
const User = mongoose.model('User');

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

export const createUser = ({Name, Email , Password, About}) => {
     
   return new Promise((resolve, reject) => {
    
    const user = {
        Name: Name,
        Email: Email,
        Password: Password,
        About: About
    }

    const newUser = new User(user);
    newUser.save((err, results) => {
       if(err) return reject(500);
       else return resolve(results._id);
     });
  });
}



