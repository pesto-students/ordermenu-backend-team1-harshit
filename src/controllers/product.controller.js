const { catchAsync } = require('../utils');
const { productService } = require('../services/')

const createProduct = catchAsync(async (req, res) => {
  const product = await productService.createProduct(req.user._id, req.body)
  res.send(product)
});

const getProductById = catchAsync(async (req, res) => {
  const product = await productService.getProductById(req.user._id, req.params.id)
  res.send(product)
});

const getAllProducts = catchAsync(async (req, res) => {
  const products = await productService.getAllProducts(req.user._id)
  res.send(products)
});

const updateProductById = catchAsync(async (req, res) => {
  const product = await productService.updateProductById(req.user._id, req.params.id, req.body)
  res.send(product)
});

const deleteProductById = catchAsync(async (req, res) => {
  const productId = await productService.deleteProductById(req.user._id, req.params.id)
  res.send(productId)
});

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById
}