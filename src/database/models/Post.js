import  mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
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



postSchema.plugin(mongoosePaginate);

mongoose.model('Post', postSchema);