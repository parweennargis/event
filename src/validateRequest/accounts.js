const validate = require('../utils/validate');

module.exports = {
    'registerJobSeeker': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', maxLength: 128 },
                last_name: { type: 'string', maxLength: 128 },
                email: { type: 'string', format: 'email', maxLength: 128 },
                phone_no: { type: 'string' },
                password: { type: 'string', minLength: 8, maxLength: 20 },
                address: { type: 'string' },
                postal_code: { type: 'string' },
                occupation: { type: 'string', enum: ['DRIVER', 'OPERATOR', 'MECHANIC', 'LOGISTIC', 'OTHERS'] },
                total_experience: { type: 'string' },
                occupation_looking_for: { type: 'string', enum: ['DRIVER', 'OPERATOR', 'MECHANIC', 'LOGISTIC', 'OTHERS'] },
                heard_about: { type: 'string', enum: ['FACEBOOK', 'TWITTER', 'LINKEDIN', 'INSTAGRAM', 'GOOGLE', 'MAGAZINE', 'WEBSITE', 'BANNER', 'KIJIJI', 'OTHERS'] }
            },
            required: ['first_name', 'last_name', 'email', 'password', 'phone_no', 'address', 'postal_code', 'heard_about', 'occupation', 'total_experience', 'occupation_looking_for']
        });
    },
    'login': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', maxLength: 128 },
                password: { type: 'string', minLength: 8, maxLength: 20 },
            },
            required: ['email', 'password']
        })
    },
    'forgotPassword': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', maxLength: 128 }
            },
            required: ['email']
        });
    },
    'changePassword': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                password: { type: 'string' },
                confirm_password: { type: 'string' },
                token: { type: 'string' }
            },
            required: ['password', 'token']
        });
    },
    'registerAttendee': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', maxLength: 128 },
                last_name: { type: 'string', maxLength: 128 },
                email: { type: 'string', format: 'email', maxLength: 128 },
                password: { type: 'string', minLength: 8, maxLength: 20 }
            },
            required: ['first_name', 'last_name', 'email', 'password']
        });
    },
    'registerExhibitor': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', maxLength: 128 },
                last_name: { type: 'string', maxLength: 128 },
                email: { type: 'string', format: 'email', maxLength: 128 },
                phone_no: { type: 'string' },
                password: { type: 'string', minLength: 8, maxLength: 20 },
                address: { type: 'string' },
                postal_code: { type: 'string' },
                company_name: { type: 'string' },
                company_website: { type: 'string' },
                current_position: { type: 'string' },
                heard_about: { type: 'string', enum: ['FACEBOOK', 'TWITTER', 'LINKEDIN', 'INSTAGRAM', 'GOOGLE', 'MAGAZINE', 'WEBSITE', 'BANNER', 'KIJIJI', 'OTHERS'] }
            },
            required: ['first_name', 'last_name', 'email', 'password', 'phone_no', 'address', 'postal_code', 'role_type', 'heard_about']
        });
    },
}
