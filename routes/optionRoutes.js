// routes/optionRoutes.js
const express = require('express');
const optionController = require('../controllers/optionController');
const router = express.Router();

router.route('/')
  .get(optionController.getAllOptions)
  .post(optionController.createOption);

router.route('/:id')
  .delete(optionController.deleteOption)
  .patch(optionController.updateProductOptions);
 


module.exports = router;
