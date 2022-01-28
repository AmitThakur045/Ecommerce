const Product = require("../models/productModel");

// Create Product - Admit only admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
