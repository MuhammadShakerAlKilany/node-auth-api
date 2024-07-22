const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: String,
 password: String,

},{
  timestamps: true,
});

module.exports = mongoose.model('User', User)