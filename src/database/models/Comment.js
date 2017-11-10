import  mongoose from 'mongoose';
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
  Author: { type: String, defualt: '' },
  Content: { type: String, default: '' },
  Timestamp: { type: Date, default: Date.now},
  LikeCount: { type: Number, default: '' },

});

mongoose.model('Comment', CommentSchema);