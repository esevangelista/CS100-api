import db from './../../database/index';
import mongoose from 'mongoose';
import model from './../../database/models/index';
import fs from 'fs';
import mv from 'mv';

const Post = mongoose.model('Post');
const likedPosts = [];

export const getAllPost = () => {
  return new Promise((resolve, reject) => {
    Post.find({}, (err,results) => {
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
    
  });
}

export const getAllPostofUser = ({ Cid }) => {
  return new Promise((resolve, reject) => {
    Post.find({ "author" : Cid }, (err,results) => {
      if(err) return reject(500);
      else if(results.length === 0) return reject(404);
      else return resolve(results);
    });
  });
}

export const getPostofUser = ({ Cid , _id}) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ "author" : Cid , "_id" : _id }, (err,result) => {
      if(err) return reject(500);
      else return resolve(result);
    });
  });
}

export const getPost = ({_id}) => {
  return new Promise((resolve, reject) => {
    Post.findOne({ _id }, (err,result) => {
      if(err) return reject(500);
      else return resolve(result);
    });
  });
}

export const deletePost = ({ _id }) => {   
  return new Promise((resolve, reject) => {   
    Post.remove({ _id }, (err) => {   
      if(err) return reject(500);   
      return resolve();   
    });   
  });   
};

export const unlinkImage = ({ _id}) => {
  Post.findOne({_id}, (err,results) => {
    if(err) console.log('unable to delete image')
    fs.unlink(JSON.parse((JSON.stringify(results.imagePath))));
  });  
};


export const attachImage = (filename,folder, {image} ) => {
  return new Promise((resolve, reject) =>{
    if({image} === null) return resolve(null);
    const imgurl = folder + filename +'.jpg';
    const Path = __dirname + imgurl;
    image.mv(Path,(err) =>{
      if(err) return resolve(null);
      return resolve(imgurl);

    });
  })
}


export const checkAction = ({ _id }, {action}) => {
  return new Promise((resolve,reject) => {
    if(likedPosts.indexOf(_id) === -1 && action === 'UNLIKE') return reject(409);
    else if(likedPosts.indexOf(_id) !== -1 && action === 'LIKE') return reject(409);
    return resolve();

  });
}


export const createPost = (author,{ uuid, content, imgurl}) => {
  return new Promise((resolve, reject) => {
    const post = {
      uuid: uuid,
      author: author,
      content: content,
      timestamp: new Date(),
      likeCount: 0,
      comments: [],
      imageUrl: imgurl
    }

    const newPost = new Post(post);
    newPost.save((err, results) => {
      if(err) return reject(500);
      else return resolve(results._id);
    });
  })  
};

// export const likePost = ({ Pid },{ action },prevLikes) => {
//   return new Promise((resolve,reject) => {
//     const likes = action === 'LIKE'? prevLikes += 1 : prevLikes -= 1;
//     Post.update( 
//       { _id: Pid}},
//       { $set : { "Post.likeCount": likes }},
//       (err,result) => {
//         console.log(result);
//         if(err) return reject(500);
//         action === 'LIKE'? likedComments.push(_id): likedComments.splice(likedComments.indexOf(_id),1);
//         console.log(likedComments)
//         return resolve();
   
//     });
//   });
// };
