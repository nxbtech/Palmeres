const Offer = require('../models/Offer');

exports.getOffers = async (req, res) => {
  const { category } = req.query;
  const offers = category ? await Offer.find({ category }) : await Offer.find();
  res.json(offers);
};