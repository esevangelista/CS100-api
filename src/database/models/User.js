import  mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: { type: String, default: '' },
  Email: { type: String, default: '' },
  Password: { type: String, default: '' },
  About: { type: String, default: '' },
  ImageUrl: {type: String, default: ''},
  ImagePath: {type: String, default: ''},
  Friends: { type: Array, default: [] },
  Requests: { type: Array, default: [] }
});

mongoose.model('User', UserSchema);