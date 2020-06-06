const AWS = require('aws-sdk');
const config = require('../../../config');
const CustomError = require('../../utils/error');

const cloudFrontSigner = new AWS.CloudFront.Signer(config.AWS.CloudFront.accessId, config.AWS.CloudFront.privateKey);

// 2 days as milliseconds to use for link expiration
const twoDays = 2*24*60*60*1000

module.exports = {
    getSignedUrl: async (fileName) => {
        try {
            // sign a CloudFront URL that expires 2 days from now
            const signedUrl = await cloudFrontSigner.getSignedUrl({
                url: `${config.AWS.CloudFront.url}/${fileName}` ,
                expires: Math.floor((Date.now() + twoDays)/1000), // Unix UTC timestamp for now + 2 days
            });
            return signedUrl;
        } catch (error) {
            throw new CustomError(400, error.message);            
        }
    }
}