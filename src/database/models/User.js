const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: { type: String, default: '' },
  Email: { type: String, default: '' },
  Password: { type: String, default: '' },
  About: { type: String, default: '' },
  Friends: { type: Array, default: [] },
  Requests: { type: Array, default: [] }
});

mongoose.model('User', UserSchema);