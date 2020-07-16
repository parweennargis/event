const validate = require('../utils/validate');

module.exports = {
    'createPricing': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                name: { type: 'string', maxLength: 50 },
                amount: { type: 'number' },
                short_description: { type: 'string', maxLength: 50 },
                main_description_1: { type: 'string', maxLength: 50 },
                main_description_2: { type: 'string', maxLength: 50 },
                main_description_3: { type: 'string', maxLength: 50 },
                main_description_4: { type: 'string', maxLength: 50 },
                main_description_5: { type: 'string', maxLength: 50 },
                main_description_6: { type: 'string', maxLength: 50 },
                main_description_7: { type: 'string', maxLength: 50 },
                is_active: { type: 'string', enum: ['true', 'false'] },
            },
            required: ['name', 'amount', 'short_description', 'main_description_1']
        });
    }
}
