const express = require('express');
const router = express.Router();
const productController = require("../controllers/product-controller");

router.post("/product", productController.saveProduct)

router.get("/products/:productId",productController.getProductById )

router.delete("/products/:productId", productController.deleteProductById)

router.put("/products/:productId", productController.updateProductById)

module.exports = router;