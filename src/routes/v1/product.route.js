const express = require('express');

const auth = require('../../middlewares/auth')
const { productController } = require('../../controllers/')

const router = express.Router();

router.post('/products', auth('OWNER'), productController.createProduct);
router.get('/products', auth('OWNER'), productController.getAllProducts);
router.get('/products/:id', auth('OWNER'), productController.getProductById);
router.patch('/products/:id', auth('OWNER'), productController.updateProductById);
router.delete('/products/:id', auth('OWNER'), productController.deleteProductById);

module.exports = router