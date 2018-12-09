const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  githubId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  conversations: {
    type: Array
  }
});

module.exports = User = mongoose.model('user', userSchema);