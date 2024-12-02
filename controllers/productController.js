const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Category = require('./../models/categoryModel');
const Option = require('./../models/optionModel');

// Pre-configured middleware for top products
exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,description';
  next();
};

// Get all products
exports.getAllProducts = catchAsync(async function (req, res, next) {
  // Execute the query
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sorting()
    .limitFields()
    .Pagination();
  const products = await features.query;

  // Send the response
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products, // Changed from "tours" to "products"
    },
  });
});

// Get a single product by ID
exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product, // Changed from "tour" to "product"
    },
  });
});

// Create a new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    price,
    category,
    ratingsAverage,
    priceDiscount,
    description,
    imageCover,
    images,
  } = req.body;

  // Check if the category exists
  const categoryDoc = await Category.findOne({ name: category });
  if (!categoryDoc) {
    return next(new AppError('Category does not exist', 400));
  }

  // Create the product
  const newProduct = await Product.create({
    name,
    price,
    category: categoryDoc._id, // Use the category ID
    ratingsAverage,
    priceDiscount,
    description,
    imageCover,
    images,
  });

  // Send success response
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

// Update a product by ID
exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Return the updated product
    runValidators: true, // Ensure validation
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product, // Changed from "tour" to "product"
    },
  });
});

// Delete a product by ID
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;

  // Find the category document
  const categoryDoc = await Category.findOne({ name: category });
  if (!categoryDoc) {
    return next(new AppError('Category does not exist', 404));
  }

  // Find products belonging to the category
  const products = await Product.find({ category: categoryDoc._id });

  // Send success response
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});
exports.getProductsByOption = catchAsync(async (req, res, next) => {
  let optionId = req.params.option;

  // Decode URL-encoded characters
  optionId = decodeURIComponent(optionId);

  // Find the option by name
  const option = await Option.findOne({ _id: optionId });
  if (!option) {
    return next(new AppError('No products found with that option', 404));
  }

  // Find all products that include the specified option
  const products = await Product.find({ options: option._id });

  // Send the response
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: {
      products,
    },
  });
});
