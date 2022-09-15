const { catchAsync } = require('../utils');
const { tableService } = require('../services/')

const createTable = catchAsync(async (req, res) => {
  const table = await tableService.createTable(req.user._id, req.body.number)
  res.send(table)
});

const getTableById = catchAsync(async (req, res) => {
  const table = await tableService.getTableById(req.user._id, req.params.id)
  res.send(table)
});

const getAvailableTable = catchAsync(async (req, res) => {
  const availableTable = await tableService.getAvailableTable(req.params.id);
  res.send(availableTable)
});

const getAllTables = catchAsync(async (req, res) => {
  const tables = await tableService.getAllTables(req.user._id)
  res.send(tables)
});

const updateTableById = catchAsync(async (req, res) => {
  const table = await tableService.updateTableById(req.user._id, req.params.id, req.body)
  res.send(table)
});

const deleteTableById = catchAsync(async (req, res) => {
  const tableId = await tableService.deleteTableById(req.user._id, req.params.id)
  res.send(tableId)
});

module.exports = {
  createTable,
  getTableById,
  getAllTables,
  updateTableById,
  deleteTableById,
  getAvailableTable
}