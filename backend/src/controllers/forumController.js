const ForumPost = require('../models/ForumPost');

exports.getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

exports.addPost = async (req, res) => {
  try {
    const { topic, sender, content } = req.body;
    if (!topic || !sender || !content) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const post = new ForumPost({
      topic,
      sender,
      content,
      time: new Date(),
      isCurrentUser: true,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};