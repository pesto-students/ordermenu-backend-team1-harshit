const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const S3 = require("aws-sdk/clients/s3");
const { S3Client } = require('@aws-sdk/client-s3')
const httpStatus = require('http-status')

const { ApiError } = require('../utils/')


const config = require("../config/config")
const { bucketName, region, accessKey, secretKey } = config.aws.s3;

const s3 = new S3({
  region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey
  }
})

const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.fileName,
  };
  return s3.upload(uploadParams).promise();
}

const uploadFileFrontend = async (req, res) => {

  singleUpload(req, res, function (err) {
    if (err) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to upload the file.");
    }

    res.send({
      url: req.file.location
    })
  })
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new ApiError(httpStatus.BAD_REQUEST, "Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    ACL: "public-read",
    s3: s3Client,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
});

const singleUpload = upload.single("image");


module.exports = { uploadFile, uploadFileFrontend };