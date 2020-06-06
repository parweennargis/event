const validate = require('../utils/validate');

module.exports = {
    'contact': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                name: { type: 'string' },
                email: { type: 'string' },
                // TODO
                phone_no: { type: 'string' },
                subject: { type: 'string' },
                message: { type: 'string' },
            },
            required: ['name', 'email', 'subject']
        });
    }
}
