const AWS = require('aws-sdk');
const config = require('../../../config');

const ses = new AWS.SES({
    accessKeyId: config.AWS.accessKeyId,
    secretAccessKey: config.AWS.secretAccessKey,
    region: config.AWS.region,
    apiVersion: '2010-12-01'
});

// Create the promise and SES service object
const sendMail = ({ toAddresses, subjectBody, bodyData = '', bodyType = 'Html', ccAddresses = [] }) => {
    //Check bodyType it should be Html or Text
    //Check toAddresses it should have atleast one length
    // Check subjectBody

    // Create sendEmail params 
    const MessageBody = {
        Html: {
            Charset: "UTF-8",
            Data: bodyData
        },
        Text: {
            Charset: "UTF-8",
            Data: bodyData
        }
    };
    const params = {
        Destination: { /* required */
            CcAddresses: ccAddresses,
            ToAddresses: toAddresses
        },
        Message: { /* required */
            Body: { /* required */
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subjectBody
            }
        },
        Source: 'nav@thetruckingnetwork.ca', /* required */
        // ReplyToAddresses: [
        //    'EMAIL_ADDRESS',
        //   /* more items */
        // ],
    };

    params.Message.Body[bodyType] = MessageBody[bodyType];
    
    const sesPromise = ses.sendEmail(params).promise();

    // Handle promise's fulfilled/rejected states
    sesPromise.then(
        function (data) {
            console.log(data.MessageId);
        }).catch(
            function (err) {
                console.error(err, err.stack);
            });
}


module.exports = {
    sendMail
}