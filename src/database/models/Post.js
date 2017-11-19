import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  uuid: {type: String, default:'' },
  author: { type: String, default: '' },
  content: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  comments: { type: Array, default: [] },
  likeCount: { type: Number, default: '' },
  imageUrl: {type: String, default:''}
});




mongoose.model('Post', postSchema);