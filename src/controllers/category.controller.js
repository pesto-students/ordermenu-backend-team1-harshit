const { catchAsync } = require('../utils');
const { categoryService } = require('../services');


const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.user._id, req.body)
  res.send(category)
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.user._id, req.params.id)
  res.send(category)
});

const getAllCategories = catchAsync(async (req, res) => {
  const categories = await categoryService.getAllCategories(req.user._id)
  res.send(categories)
});

const updateCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.user._id, req.params.id, req.body)
  res.send(category)
});

const deleteCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.deleteCategoryById(req.user._id, req.params.id)
  res.send(category)
});

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById
}