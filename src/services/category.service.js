const httpStatus = require('http-status')
const { ApiError } = require('../utils/')
const partnerService = require('./partner.service')

const createCategory = async (ownerId, category) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  if (partner.categories.find(c => c.name.toLowerCase() === category.name.toLowerCase()))
    throw new ApiError(httpStatus.BAD_REQUEST, `Category with name '${category.name}' already exists!`)

  partner.categories.push(category)
  partner.save()
  return partner.categories[partner.categories.length - 1]
};

const getCategoryById = async (ownerId, categoryId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  const category = partner.categories.find(category => category._id == categoryId)
  if (!category)
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!")

  return category
};

const getAllCategories = async (ownerId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  return partner.categories
};

const updateCategoryById = async (ownerId, categoryId, category) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  const index = partner.categories.findIndex(category => category._id == categoryId)
  if (index < 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!")

  if (partner.categories.find(c => c.name.toLowerCase() === category.name.toLowerCase()))
    throw new ApiError(httpStatus.BAD_REQUEST, `Category with name '${category.name}' already exists!`)

  if (category?.name) partner.categories.id(categoryId).name = category?.name;
  if (category?.image) partner.categories.id(categoryId).image = category?.image;
  if (category?.description) partner.categories.id(categoryId).description = category?.description;
  partner.save()
  return partner.categories.find(c => c._id == categoryId)
};

const deleteCategoryById = async (ownerId, categoryId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  const index = partner.categories.findIndex(category => category._id == categoryId)
  if (index < 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Category not found!")
  partner.categories.id(categoryId).remove()
  return partner.save()
};

module.exports = {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById
}