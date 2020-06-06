const validate = require('../utils/validate');

module.exports = {
    'createEventCategory': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                name: { type: 'string' },
                is_active: { type: 'boolean' }
            },
            required: ['name', 'is_active']
        });
    },
    'updateEventCategory': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                name: { type: 'string' },
                is_active: { type: 'boolean' }
            },
            minProperties: 1
        });
    }
}
