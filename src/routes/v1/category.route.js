const express = require('express');

const auth = require('../../middlewares/auth')
const { categoryController } = require('../../controllers/')

const router = express.Router();

router.post('/categories', auth('categories'), categoryController.createCategory);
router.get('/categories', auth('categories'), categoryController.getAllCategories);
router.get('/categories/:id', auth('categories'), categoryController.getCategoryById);
router.patch('/categories/:id', auth('categories'), categoryController.updateCategoryById);
router.delete('/categories/:id', auth('categories'), categoryController.deleteCategoryById);

module.exports = router