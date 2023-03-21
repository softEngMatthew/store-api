const products = require("../data/products");

//GET /products
const getAllProducts = (req, res) => {
  res.json(products);
};

//GET /products/:id
const getProductById = (req, res) => {
  const product = products.find((item) => item.id === req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(400).json({ message: "Product not found" });
  }
};

//POST /products
const createProduct = (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
};

//PUT /products/:id
const updateProduct = (req, res) => {
  const product = products.find((item) => item.id === req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    res.json(product);
  } else {
    res.status(400).json({ message: "Product not found" });
  }
};

//DELETE /products/:id
const deleteProduct = (req, res) => {
  const index = products.findIndex((item) => item.id === req.params.id);

  //if there is the product we want
  if (index !== -1) {
    //remove one element from the array at the specified index position
    //remove the item with our id from the array
    products.splice(index, 1);
    res.json({ message: "Product removed" });
  } else {
    res.status(400).json({ message: "Product not found" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
