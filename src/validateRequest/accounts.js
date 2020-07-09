const validate = require('../utils/validate');

module.exports = {
    'registerJobSeeker': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                phone_no: { type: 'string' },
                password: { type: 'string', minLength: 8, maxLength: 20 },
                address: { type: 'string', minLength: 20, maxLength: 100 },
                postal_code: { type: 'string', format: 'canadaPostalCode' },
                occupation: { type: 'string', enum: ['DRIVER', 'OPERATOR', 'MECHANIC', 'LOGISTIC', 'OTHERS'] },
                total_experience: { type: 'string', format: 'numberString', maxLength: 2 },
                occupation_looking_for: { type: 'string', enum: ['DRIVER', 'OPERATOR', 'MECHANIC', 'LOGISTIC', 'OTHERS'] },
                heard_about: { type: 'string', enum: ['FACEBOOK', 'TWITTER', 'LINKEDIN', 'INSTAGRAM', 'GOOGLE', 'MAGAZINE', 'WEBSITE', 'BANNER', 'KIJIJI', 'EMAIL', 'NOTIFICATION', 'RADIO', 'TV', 'BROADCAST', 'WEBINAR'] },
                license_type: { type: 'string' },
                license_number: { type: 'string' },
                license_date_of_expiry: { type: 'string' },
                driving_record_rating: { type: 'string', enum: ['EXCELLENT', 'VERY_GOOD', 'GOOD', 'BAD', 'VERY_BAD'] },
            },
            required: ['first_name', 'email', 'password', 'phone_no', 'address', 'postal_code', 'heard_about', 'occupation', 'total_experience', 'occupation_looking_for']
        });
    },
    'login': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', maxLength: 50 },
                password: { type: 'string', minLength: 8, maxLength: 20 },
            },
            required: ['email', 'password']
        })
    },
    'forgotPassword': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                email: { type: 'string', format: 'email', maxLength: 50 }
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
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                password: { type: 'string', minLength: 8, maxLength: 20 }
            },
            required: ['first_name', 'email', 'password']
        });
    },
    'registerExhibitor': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                phone_no: { type: 'string' },
                password: { type: 'string', minLength: 8, maxLength: 20 },
                address: { type: 'string', minLength: 20, maxLength: 100 },
                postal_code: { type: 'string', format: 'canadaPostalCode' },
                company_name: { type: 'string' },
                company_website: { type: 'string' },
                current_position: { type: 'string' },
                heard_about: { type: 'string', enum: ['FACEBOOK', 'TWITTER', 'LINKEDIN', 'INSTAGRAM', 'GOOGLE', 'MAGAZINE', 'WEBSITE', 'BANNER', 'KIJIJI', 'EMAIL', 'NOTIFICATION', 'RADIO', 'TV', 'BROADCAST', 'WEBINAR'] }
            },
            required: ['first_name', 'email', 'password', 'phone_no', 'address', 'postal_code', 'heard_about']
        });
    },
}
