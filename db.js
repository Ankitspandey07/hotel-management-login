const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hotel', () => console.log('DB connected'));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isOwner: { type: Boolean, default: false },
  isManager: { type: Boolean, default: false },
  isReceptionist: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
