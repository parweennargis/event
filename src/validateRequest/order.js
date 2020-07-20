const validate = require('../utils/validate');

module.exports = {
    'order': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                phone_no: { type: 'string', format: 'phone' },
                address: { type: 'string', minLength: 20, maxLength: 100 },
                postal_code: { type: 'string', format: 'canadaPostalCode' },
                current_position: { type: 'string' },
                city: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
                province: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
                country: { type: 'string', maxLength: 50 }
            },
            required: ['first_name', 'email', 'phone_no', 'current_position', 'address', 'city', 'province', 'postal_code', 'country']
        });
    },
}
