const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  githubId: String,
  displayName: String
});

module.exports = User = mongoose.model('user', userSchema);