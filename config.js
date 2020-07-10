const fs = require('fs');

module.exports = {
    AWS: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
        S3: {
            bucketName: process.env.AWS_BUCKET_NAME,
            region: process.env.AWS_S3_REGION
        },
        CloudFront: {
            accessId: process.env.CLOUDFRONT_ACCESS_KEY,
            privateKey: fs.readFileSync(process.env.CLOUDFRONT_PRIVATE_KEY_PATH),
            url: process.env.CLOUDFRONT_URL
        }
    },
    websiteUrl: process.env.WEBSITE_URL
};