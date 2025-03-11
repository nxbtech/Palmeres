const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  const { category } = req.query;
  const products = category ? await Product.find({ category }) : await Product.find();
  res.json(products);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
  res.json(product);
};