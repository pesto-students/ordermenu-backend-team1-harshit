const httpStatus = require('http-status')
const { ApiError } = require('../utils/')
const partnerService = require('./partner.service')
const qrService = require('./qr.service')
const uploadService = require('./upload.service')

const createTable = async (ownerId, tableNumber) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  if (partner.tables.find(table => +table.number === +tableNumber))
    throw new ApiError(httpStatus.BAD_REQUEST, `Table with table number '${tableNumber}' already exists!`)

  const url = `http://localhost:3000/${partner.slug}/${tableNumber}`

  const file = await qrService.generateQR(url);
  const uploadedFile = await uploadService.uploadFile(file);

  partner.tables.push({
    number: tableNumber,
    qrCode: uploadedFile.Location
  })

  return partner.save()
};

const getTableById = async (ownerId, tableId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  const table = partner.tables.find(table => table._id == tableId)
  if (!table)
    throw new ApiError(httpStatus.NOT_FOUND, "Table not found!")
  return table
};

const getAllTables = async (ownerId, tableId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)
  return partner.tables
};

const deleteTableById = async (ownerId, tableId) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  const index = partner.tables.findIndex(table => table._id == tableId)
  if (index < 0)
    throw new ApiError(httpStatus.NOT_FOUND, "Table not found!")
  partner.tables.id(tableId).remove()
  return partner.save()
};

module.exports = {
  createTable,
  getTableById,
  getAllTables,
  deleteTableById
}