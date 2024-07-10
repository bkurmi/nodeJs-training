const express = require('express');
const router = express.Router();
const productController = require("../controllers/product-controller");

const isAuth = require("../middleware/auth-middleware");

//For this route, we have middleware and now we can add as manymiddleware for this route separated by comma
//router.post("/product", authMiddleware, logMiddleware, productController.saveProduct (this is also middleware) )
//We can keep adding middlewares in this string before making call to controllers
router.post("/product",isAuth, productController.saveProduct)

router.get("/products/:productId",isAuth, productController.getProductById )

router.delete("/products/:productId",isAuth, productController.deleteProductById)

router.put("/products/:productId",isAuth, productController.updateProductById)

module.exports = router;