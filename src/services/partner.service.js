const httpStatus = require('http-status');
const { randomUUID } = require('crypto');
const { Partner } = require('../models/')
const { ApiError, generateSlug } = require('../utils/')

const createPartnerAccount = async (partner) => {
  let slug = generateSlug(partner.name);

  if (await Partner.findOne({ slug })) {
    slug = generateSlug(partner.name + "-" + randomUUID())
  }

  return Partner.create({ ...partner, slug })
};

const getPartnerBySlug = async (slug) => {
  const partner = Partner.findOne({ slug })
  if (!partner)
    throw new ApiError(httpStatus.NotFound, "Partner not found!")
  return partner
};

const getPartnerById = async (id) => {
  const partner = Partner.findOne({ _id: id })
  if (!partner)
    throw new ApiError(httpStatus.NotFound, "Partner not found!")
  return partner
};

const getPartnerByOwnerId = async (ownerId) => {
  const partner = await Partner.findOne({ ownerId })

  if (!partner)
    throw new ApiError(httpStatus.NotFound, "Partner not found!")
  return partner
};

const getAllPartners = async () => {
  return Partner.find()
};

const updatePartnerById = async (partnerId, updateBody) => {
  const partner = await Partner.findOne({ _id: partnerId });
  if (!partner) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Partner not found');
  }

  Object.assign(partner, updateBody);
  await partner.save();
  return partner;
};

const deletePartnerById = async (partnerId) => {
  const partner = await Partner.deleteOne({ _id: partnerId })

  if (partner?.deletedCount === 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Partner does not exist!")

  return partner;
};

module.exports = {
  createPartnerAccount,
  getPartnerBySlug,
  getAllPartners,
  updatePartnerById,
  deletePartnerById,
  getPartnerByOwnerId,
  getPartnerById
}