const QRCode = require('qrcode');
const { randomUUID } = require('crypto')

const generateQR = async (url) => {
  const fileName = `${randomUUID()}.png`
  const path = `./public/files/${fileName}`
  await QRCode.toFile(path, url)
  return { fileName, path }
}

module.exports = { generateQR }