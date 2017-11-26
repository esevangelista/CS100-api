import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  about: { type: String, default: '' },
  //imageUrl: {type: String, default: ''},
  //imagePath: {type: String, default: ''},
  friends: { type: Array, default: [] },
  requests: { type: Array, default: [] },
  likedPosts : { type: Array, default: [] },
  likedComments : { type: Array, default: [] },

});

mongoose.model('User', userSchema);