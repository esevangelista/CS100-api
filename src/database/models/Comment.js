import  mongoose from 'mongoose';
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  author: { type: String, defualt: '' },
  content: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now},
  likeCount: { type: Number, default: '' },

});

mongoose.model('Comment', commentSchema);