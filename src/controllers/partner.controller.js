const httpStatus = require('http-status')
const { catchAsync } = require('../utils');
const { partnerService, userService } = require('../services');
const constants = require('../config/constants');

const createPartnerAccount = catchAsync(async (req, res) => {
  const user = await userService.createUser({ ...req.body.user, role: constants.userTypes.OWNER });
  const partner = await partnerService.createPartnerAccount({ ...req.body.partner, ownerId: user._id });
  res.send(partner)
});

const getPartnerBySlug = catchAsync(async (req, res) => {
  const partner = await partnerService.getPartnerBySlug(req.params.slug);
  res.send(partner)
});

const getAllPartners = catchAsync(async (req, res) => {
  const partners = await partnerService.getAllPartners();
  res.send(partners)
});

const updatePartnerById = catchAsync(async (req, res) => {
  const partner = await partnerService.updatePartnerById(req.params.id, req.body);
  res.send(partner)
});

const deletePartnerById = catchAsync(async (req, res) => {
  await partnerService.deletePartnerById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPartnerAccount,
  getPartnerBySlug,
  getAllPartners,
  updatePartnerById,
  deletePartnerById
}