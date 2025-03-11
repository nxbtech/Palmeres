const mongoose = require('mongoose');

const forumPostSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Date, default: Date.now },
  isCurrentUser: { type: Boolean, default: false },
});

module.exports = mongoose.model('ForumPost', forumPostSchema);