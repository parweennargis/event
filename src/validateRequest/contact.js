const validate = require('../utils/validate');

module.exports = {
    'contact': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                name: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                phone_no: { type: 'string', format: 'phone' },
                subject: { type: 'string' },
                message: { type: 'string' },
            },
            required: ['name', 'email', 'phone_no', 'subject', 'message']
        });
    },

    'subscribeNewsletter': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email' }
            },
            required: ['email']
        });
    }
}
