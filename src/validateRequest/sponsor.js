const validate = require('../utils/validate');

module.exports = {
    'sponsor': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                image: { type: 'string' },
                website: { type: 'string' }
            },
            required: [
                'title'
            ]
        });
    }
};
