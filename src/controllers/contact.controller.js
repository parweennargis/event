const contactService = require('../service/contact.service');
const awsSesService = require('../service/aws/aws.ses.service');
const contactValidation = require('../validateRequest/contact');

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
                    name: result.name
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
            return res.json({ data: result });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
};
