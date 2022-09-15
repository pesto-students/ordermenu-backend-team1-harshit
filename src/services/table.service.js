const httpStatus = require('http-status')
const fs = require('fs')
const { ApiError } = require('../utils/')
const partnerService = require('./partner.service')
const qrService = require('./qr.service')
const uploadService = require('./upload.service')

const createTable = async (ownerId, tableNumber) => {
  const partner = await partnerService.getPartnerByOwnerId(ownerId)

  if (partner.tables.find(table => +table.number === +tableNumber))
    throw new ApiError(httpStatus.BAD_REQUEST, `Table with table number '${tableNumber}' already exists!`)

  const url = `https://www.ordermenu.store/${partner.slug}?table=${tableNumber}`

  const file = await qrService.generateQR(url);
  const uploadedFile = await uploadService.uploadFile(file);

  partner.tables.push({
    number: tableNumber,
    qrCode: uploadedFile.Location
  })

  fs.unlink(file.path, (err, data) => {
    console.log(err, data)
  })
  partner.save()

  return partner.tables[partner.tables.length - 1]
};

const getAvailableTable = async (partnerSlug) => {
  const partner = await partnerService.getPartnerBySlug(partnerSlug);

  const availableTable = partner?.tables?.find(table => !table?.isBooked)

  if (!availableTable)
    throw new ApiError(httpStatus.NOT_FOUND, "No table available!")

  return availableTable
}

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
  partner.save()
  return tableId
};

module.exports = {
  createTable,
  getTableById,
  getAllTables,
  getAvailableTable,
  deleteTableById
}