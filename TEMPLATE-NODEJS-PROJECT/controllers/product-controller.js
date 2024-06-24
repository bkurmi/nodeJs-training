const product = require("../models/product");
const Product = require("../models/product");

exports.saveProduct = (req, res, next) => {
  const productPrice = req.body.productPrice;
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const product = new Product({
    productPrice: productPrice,
    productName: productName,
    productDescription: productDescription,
  });

  product
    .save()
    .then((product) => {
      console.log(`Product saved successfully :: ${product.productName}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      console.log(`product found : ${product}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOneAndDelete(productId)
    .then((product) => {
      console.log(`product Deleted Successfully`);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      product.productName = req.body.productName;
      product.productDescription = req.body.productDescription;
      product.productPrice = req.body.productPrice;
      return product.save();
    })
    .then((product) => {
      console.log("Updated Successfully", product);
    })
    .catch((error) => {
      console.log("UPDATE FAILED", error);
    });
};
