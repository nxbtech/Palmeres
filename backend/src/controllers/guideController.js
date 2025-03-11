const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  link: String,
  category: { type: String, enum: ['expat', 'tourisme'] },
});

const Guide = mongoose.model('Guide', guideSchema);

exports.getGuides = async (req, res) => {
  const { category } = req.query;
  const guides = category ? await Guide.find({ category }) : await Guide.find();
  res.json(guides);
};