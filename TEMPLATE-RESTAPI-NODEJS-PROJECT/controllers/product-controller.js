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
      res.status(201).json({
        message: "Product saved successfully!",
        productId: product._id,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        const error = new Error('Duplicate product found with same name.');
        error.statusCode = 400;
        error.title = "EXISTING_PRODUCT"
        //throw error; this is required while we need to through the error which need to be caught by default exception block
        err = error;
      }
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);  //passin the control to middleware app.use((error, req, res, next) => { ... in app.js
    });
};

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then((product) => {
      if(!product){
        const error = new Error('Product not found.');
        error.statusCode = 400;
        error.title = "PRODUCT_NOT_AVAILABLE"
        throw error; //this is required while we need to through the error which need to be caught by default exception block
      }
      console.log(`product found : ${product}`);
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);  //passin the control to middleware app.use((error, req, res, next) => { ... in app.js
    });
};

exports.deleteProductById = (req, res, next) => {
  const productId = req.params.productId;
  Product.findOneAndDelete(productId)
    .then((product) => {
      if(!product){
        console.log("-----------------");
        const error = new Error('Product not found.');
        error.statusCode = 400;
        error.title = "PRODUCT_NOT_AVAILABLE"
        throw error; //this is required while we need to through the error which need to be caught by default exception block
      }
      console.log(`product Deleted Successfully`);
      res.status(204).json;
    })
    .catch((err) => {
      console.log("&&&&&&&&&&&&&&&&");
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
      res.status(200).json(product);
    })
    .catch((error) => {
      console.log("UPDATE FAILED", error);
    });
};
