const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router
  .route('/category/:category')
  .get(productController.getProductsByCategory);
  
router.route('/:option/options').get(productController.getProductsByOption);

router
  .route('/top-5-products')
  .get(productController.aliasTopProducts, productController.getAllProducts);

// Routes for CRUD operations
router
  .route('/')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
