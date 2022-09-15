const express = require('express');

const auth = require('../../middlewares/auth')
const { categoryController } = require('../../controllers/')

const router = express.Router();

router.post('/categories', auth('OWNER'), categoryController.createCategory);
router.get('/categories', auth('OWNER'), categoryController.getAllCategories);
router.get('/categories/:id', auth('OWNER'), categoryController.getCategoryById);
router.patch('/categories/:id', auth('OWNER'), categoryController.updateCategoryById);
router.delete('/categories/:id', auth('OWNER'), categoryController.deleteCategoryById);

module.exports = router