const express = require('express');
const categoryController = require('./../controllers/categoryController');
const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories) // Get all categories
  .post(categoryController.createCategory); // Create new category (password protected)

router
  .route('/:id')
  .get(categoryController.getCategory) // Get category by ID
  .delete(categoryController.deleteCategory); // Delete category by ID

module.exports = router;
