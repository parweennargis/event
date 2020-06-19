const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const Handlebars = require('handlebars');
const config = require('../../../config');

const ses = new AWS.SES({
    accessKeyId: config.AWS.accessKeyId,
    secretAccessKey: config.AWS.secretAccessKey,
    region: config.AWS.region,
    apiVersion: '2010-12-01'
});

// Create the promise and SES service object
const sendMail = async (emailTemplate, { toAddresses, subject, data = {}, bodyType = 'Html', ccAddresses = [] }) => {
    if (!emailTemplate || !toAddresses.length) {
        console.log('[Email]: Required params not passed');
        return;
    }
    //Check bodyType it should be Html or Text
    //Check toAddresses it should have atleast one length
    // Check subjectBody
    const source = fs.readFileSync(path.join(__dirname, '../../../views/email_templates/' + emailTemplate), 'utf8');

    const template = Handlebars.compile(source);

    // Create sendEmail params 
    const params = {
        Destination: { /* required */
            CcAddresses: ccAddresses,
            ToAddresses: toAddresses
        },
        Message: { /* required */
            Body: { /* required */
                Html: {
                    Charset: "UTF-8",
                    Data: template(data)
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: 'info@neuproelectro.com', /* required */
        // ReplyToAddresses: [
        //    'EMAIL_ADDRESS',
        //   /* more items */
        // ],
    };
    
    try {
        const data = await ses.sendEmail(params).promise();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    sendMail
}