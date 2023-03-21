require("dotenv").config();

const connectDB = require("./db/connect"); //connect to the database
const ProductModel = require("./models/product"); //get the schema
const jsonProducts = require("./products.json"); //get the products

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    //delete all the products that are currently there
    await ProductModel.deleteMany();
    //create the products based on the data being passed
    await ProductModel.create(jsonProducts);
    //exit the populate once it's done
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
