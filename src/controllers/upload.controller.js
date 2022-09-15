const { catchAsync } = require('../utils');
const { uploadService } = require('../services/')

const uploadFile = catchAsync(async (req, res) => {
  await uploadService.uploadFileFrontend(req, res)
});


module.exports = {
  uploadFile
}