const validate = require('../utils/validate');

module.exports = {
    'register': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' }
            },
            required: ['email', 'password']
        });
    }
}
