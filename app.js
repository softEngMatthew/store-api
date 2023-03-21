//loading the 'dontenv' library
require("dotenv").config();
//async errors
require("express-async-errors");

//import the express library and create an instance of the express application
const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//middleware
//Apply the express.json() middleware to parse incoming JSON requests and
//store the parsed data in 'req.body' object
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

//Telling the main 'express' application to use our middleware 'productsRouter'
//to handle any incoming requests that start with 'api/v1/products' route
app.use("/api/v1/products", productsRouter);

//products route

//These functions handle requests that were not matched by any route
//and handle any errors that might occur
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI); //retuns a promise
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
