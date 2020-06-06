const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../../../config');
const CustomError = require('../../utils/error');

const s3 = new AWS.S3({
    accessKeyId: config.AWS.accessKeyId,
    secretAccessKey: config.AWS.secretAccessKey,
    region: config.AWS.region
});

const uploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        try {
            // Read content from the file
            const fileContent = fs.readFileSync(file.path);
    
            // Setting up S3 upload parameters
            const params = {
                Bucket: config.AWS.S3.bucketName,
                Key: file.originalname, // File name you want to save as in S3
                Body: fileContent
            };
    
            // Uploading files to the bucket
            s3.upload(params, function(err, data) {
                if (err) {
                    reject(new CustomError(400, err.message));
                }
                fs.unlink(file.path, (err) => {
                    if (err) console.log(err);
                    console.log('File is deleted');
                });
                console.log(`File uploaded successfully. ${data.Location}`);
                resolve(data);
            });
        } catch (error) {
            reject(new CustomError(400, error.message));
        }
    });
};

module.exports = {
    uploadFile
};
