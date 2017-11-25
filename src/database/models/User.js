import  mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  about: { type: String, default: '' },
  imageUrl: {type: String, default: ''},
  imagePath: {type: String, default: ''},
  friends: { type: Array, default: [] },
  requests: { type: Array, default: [] },
  likedPosts : { type: Array, default: [] },
  likedComments : { type: Array, default: [] },

});

userSchema.plugin(mongoosePaginate);
mongoose.model('User', userSchema);