const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const config = require("../config/config")
const { bucketName, region, accessKey, secretKey } = config.aws.s3;

const s3 = new S3({
  region,
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

const uploadFile = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.fileName,
  };
  return s3.upload(uploadParams).promise();
}


module.exports = { uploadFile };