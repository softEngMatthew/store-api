//Import the express and create an instance of the Route object
const express = require("express");
const { getAllProducts } = require("../controllers/products");
const router = express.Router;

//Define routes for products API
// router.method('/path', controller)
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

module.exports = router;
