const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    secretAccessKey: process.env.AWSSecretKey,
    accessKeyId: process.env.AWSAccessKeyId
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'tb-amazon-clone-v1',
        acl: 'public-read', // public or private
        metadata: (req, file, cb) => { // cb = callback
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => { // the key of the s3 bucket
            cb(null, Date.now().toString())
        }
    })
})

module.exports = upload;