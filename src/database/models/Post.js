import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  Author: { type: String, defualt: '' },
  Content: { type: String, default: '' },
  Timestamp: { type: Date, default: Date.now },
  Comments: { type: Array, default: [] },
  LikeCount: { type: Number, default: '' },

});




mongoose.model('Post', PostSchema);