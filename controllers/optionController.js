const Product = require('../models/productModel');
const Option = require('../models/optionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllOptions = catchAsync(async (req, res, next) => {
  const options = await Option.find();
  res.status(200).json({
    status: 'success',
    results: options.length,
    data: {
      options,
    },
  });
});

exports.createOption = catchAsync(async (req, res, next) => {
  if (req.body.password !== '12345678') {
    return next(new AppError('Incorrect password', 403));
  }

  const newOption = await Option.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      option: newOption,
    },
  });
});

exports.deleteOption = catchAsync(async (req, res, next) => {
  const option = await Option.findByIdAndDelete(req.params.id);
  if (!option) {
    return next(new AppError('No option found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});


exports.updateProductOptions = catchAsync(async (req, res, next) => {
    const productId = req.params.id;
    const optionIds = req.body.options;
  
    // Validate that option IDs are provided
    if (!optionIds || !Array.isArray(optionIds)) {
      return next(new AppError('Options should be an array of option IDs', 400));
    }
  
    // Check if all provided option IDs are valid
    const options = await Option.find({ _id: { $in: optionIds } });
    if (options.length !== optionIds.length) {
      return next(new AppError('One or more options are not valid', 400));
    }
  
    // Find and update the product with the new options
    const product = await Product.findByIdAndUpdate(
      productId,
      { options: optionIds },
      { new: true, runValidators: true }
    );
  
    if (!product) {
      return next(new AppError('No product found with that ID', 404));
    }
  
    // Send the response
    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  });
  