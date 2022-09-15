const httpStatus = require('http-status')
const { ApiError } = require('../utils/')
const partnerService = require('./partner.service')

const createProduct = async (ownerId, product) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  if (partner.menu.find(menuItem => menuItem.name.toLowerCase() === product.name.toLowerCase()))
    throw new ApiError(httpStatus.BAD_REQUEST, `Product with name '${product.name}' already exists!`)

  partner.menu.push(product)
  partner.save()
  return partner.menu[partner.menu.length - 1]
};

const getProductById = async (ownerId, productId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  const product = partner.menu.find(product => product._id == productId)
  if (!product)
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found!")
  return product
};

const getAllProducts = async (ownerId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  return partner.menu
};

const updateProductById = async (ownerId, productId, product) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  const index = partner.menu.findIndex(productItem => productItem._id == productId)
  if (index < 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found!")

  if (partner.menu.find(menuItem => menuItem?.name?.toLowerCase() === product?.name?.toLowerCase() && menuItem?._id != productId))
    throw new ApiError(httpStatus.BAD_REQUEST, `Product with name '${product.name}' already exists!`)

  if (product?.name) partner.menu.id(productId).name = product?.name;
  if (product?.image) partner.menu.id(productId).image = product?.image;
  if (product?.description) partner.menu.id(productId).description = product?.description;
  if (product?.price) partner.menu.id(productId).price = product?.price;
  if (product?.category) partner.menu.id(productId).category = product?.category;
  if (product?.sizes) partner.menu.id(productId).sizes = product?.sizes;
  if (product?.extra) partner.menu.id(productId).extra = product?.extra;
  if (product?.tags) partner.menu.id(productId).tags = product?.tags;
  partner.save()
  return partner.menu.find((p) => p._id == productId)
};

const deleteProductById = async (ownerId, productId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  const index = partner.menu.findIndex(product => product._id == productId)
  if (index < 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found!")
  partner.menu.id(productId).remove()
  partner.save()
  return productId
};

module.exports = {
  createProduct,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById
}