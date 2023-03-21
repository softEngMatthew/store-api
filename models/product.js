const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must me provided"],
    trim: true,
    maxLength: [20, "Product name must be less than 20 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price must me provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    //use the current date
    default: Date.now(),
  },
  company: {
    type: String,
    //limit the possibilities of what can be added
    //4 values that can be chosen
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} is not supported",
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
