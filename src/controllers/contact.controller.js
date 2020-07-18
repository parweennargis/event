const contactService = require('../service/contact.service');
const awsSesService = require('../service/aws/aws.ses.service');
const contactValidation = require('../validateRequest/contact');

const config = require('../../config');

module.exports = {
    createContact: async (req, res) => {
        try {
            const { body } = req;
            contactValidation.contact(body);
            const result = await contactService.createContact(body);
            awsSesService.sendMail('contact-us.hbs', {
                toAddresses: [result.email],
                subject: 'Contact Us',
                data: {
                    name: result.name,
                    websiteUrl: `${config.websiteUrl}`
                }
            });
            awsSesService.sendMail('contact-us-admin.hbs', {
                toAddresses: [process.env.ADMIN_EMAIL],
                subject: 'Contact Us Query',
                data: {
                    name: result.name,
                    email: result.email,
                    phone_no: result.phone_no,
                    subject: result.subject,
                    message: result.message,
                    websiteUrl: `${config.websiteUrl}`
                }
            });

            return res.json({ data: result });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    subscribeNewsletter: async (req, res) => {
        try {
            const { body } = req;
            contactValidation.subscribeNewsletter(body);
            const result = await contactService.subscribeNewsletter(body);
            awsSesService.sendMail('subscribe.hbs', {
                toAddresses: [result.email],
                subject: 'The Trucking Network Subscription',
                data: { 
                    websiteUrl: `${config.websiteUrl}`
                }
            });
            return res.json({ data: result });
        } catch (error) {
            return res.status(400).json({ errors: 'You are aleady subscribed!!' });
        }
    }
};
