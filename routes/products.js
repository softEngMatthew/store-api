//Import the express module
const express = require("express");

//Create a new router object using the Router function from the express module
const router = express.Router();

//import the functions from the controllers
const { getAllProducts } = require("../controllers/products");

//main route = /api/v1/products
router.route("/").get(getAllProducts);

module.exports = router;
