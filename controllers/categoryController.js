const Category = require('./../models/categoryModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.createCategory = catchAsync(async (req, res, next) => {
  const { password, name } = req.body;

  // Check if the password is '12345678'
  if (password !== '12345678') {
    return next(
      new AppError(
        'Incorrect password. You are not allowed to create a category.',
        403
      )
    );
  }

  // Create category if the password is correct
  const category = await Category.create({ name });

  res.status(201).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 'success',
    data: {
      categories,
    },
  });
});
exports.getCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});



// Delete a category by ID
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
