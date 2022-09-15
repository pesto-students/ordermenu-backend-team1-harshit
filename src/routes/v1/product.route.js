const express = require('express');

const auth = require('../../middlewares/auth')
const { productController } = require('../../controllers/')

const router = express.Router();

router.post('/products', auth('products'), productController.createProduct);
router.get('/products', auth('products'), productController.getAllProducts);
router.get('/products/:id', auth('products'), productController.getProductById);
router.patch('/products/:id', auth('products'), productController.updateProductById);
router.delete('/products/:id', auth('products'), productController.deleteProductById);

module.exports = router