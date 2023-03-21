const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  //destructure these terms from the request query
  //extract these values from the req.query object
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  //where we store the query conditions that will be used to filter the products
  const queryObject = {};

  //if the featured property is present in the req.query
  if (featured) {
    //set the featured property as true
    queryObject.featured = featured === "true" ? true : false;
  }

  //if the company property is present in the req.query
  if (company) {
    //set it to the value of company
    queryObject.company = company;
  }

  //if the name property is present in the req.query
  if (name) {
    //set it to the value of name
    //$regex: give any occurence of the term
    //$options: 'i' -> case insensitive
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regEx = /\b(>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    //split where there is the comma
    filters = filters.split(",").forEach((item) => {
      //split on hyphen
      const [field, operator, value] = item.split("-");

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  //get me only the products with attend the requirements given in the query search
  let result = Product.find(queryObject);

  //SORT = return the results in a given order
  //if there is the sort query...
  if (sort) {
    //take these query params and format them to be accepted
    const sortList = sort.split(",").join(" ");
    //sort the result array with the sorting criteria and save it in our result variable
    result = result.sort(sortList);
  } else {
    //if there's no sorting criteria, this will be the default
    result = result.sort("createdAt");
  }

  //SELECT = return just the highlighted properties
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //PAGE, LIMIT
  //If the query is passed in, go with it || otherwise, here is the default
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  //We adde the await to results because of the sort above
  const products = await result;

  res.status(200).json(products);
};

module.exports = {
  getAllProducts,
};
