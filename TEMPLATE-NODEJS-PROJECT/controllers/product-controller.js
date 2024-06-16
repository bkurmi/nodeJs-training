const { nextTick } = require("process");
const Product = require("../models/product");
const { connectToDB } = require('../util/database')

exports.saveProduct = async (req, res, next) => {
  const db = await connectToDB();
  const productId = req.productId;
  const productName = req.productName;
  const productDescription = req.productDescription;
  const product = new Product(productId, productName, productDescription);
  product.save();
  console.log("Product has been saved successfully");
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId);
  console.log("Product has been Found successfully");
}

exports.deleteProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.deleteById(productId);
  console.log("Product has been deleted successfully");
}

exports.updateProductById = (req, res, next) => {
  const productId = req.params.productId;
  const productName = req.productName;
  const productDescription = req.productDescription;
  const product = new Product(productId, productName, productDescription);
  Product.updateById(productId, product);
  console.log("Product has been Updated successfully");
}