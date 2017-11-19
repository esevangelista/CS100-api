import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: { type: String, defualt: '' },
  content: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  comments: { type: Array, default: [] },
  likeCount: { type: Number, default: '' },

});




mongoose.model('Post', postSchema);