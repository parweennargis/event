const validate = require('../utils/validate');

module.exports = {
    'profileJobSeeker': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                phone_no: { type: 'string' },
                address: { type: 'string', minLength: 20, maxLength: 100 },
                postal_code: { type: 'string', format: 'canadaPostalCode' },
                occupation: { type: 'string', enum: ['DRIVER', 'OPERATOR', 'MECHANIC', 'LOGISTIC', 'OTHERS'] },
                total_experience: { type: 'string', format: 'numberString', maxLength: 2 },
                occupation_looking_for: { type: 'string', enum: ['DRIVER', 'OPERATOR', 'MECHANIC', 'LOGISTIC', 'OTHERS'] },
                license_type: { type: 'string' },
                license_number: { type: 'string' },
                license_date_of_expiry: { type: 'string' },
                driving_record_rating: { type: 'string', enum: ['EXCELLENT', 'VERY_GOOD', 'GOOD', 'BAD', 'VERY_BAD'] },
                city: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
                province: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
            },
            required: [ 'first_name', 'email', 'phone_no', 'address', 'postal_code', 'occupation', 'total_experience', 'occupation_looking_for' ]
        });
    },
    'profileAttendee': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 }
            },
            required: [ 'first_name', 'email' ]
        });
    },
    'profileExhibitor': (body) => {
        validate(body, {
            type: 'object',
            properties: {
                first_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                last_name: { type: 'string', format: 'strictAlphabet', maxLength: 20 },
                email: { type: 'string', format: 'email', maxLength: 50 },
                phone_no: { type: 'string' },
                address: { type: 'string', minLength: 20, maxLength: 100 },
                postal_code: { type: 'string', format: 'canadaPostalCode' },
                company_name: { type: 'string' },
                company_website: { type: 'string' },
                current_position: { type: 'string' },
                city: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
                province: { type: 'string', format: 'strictAlphabet', maxLength: 50 },
                business_type: { type: 'string' },
                business_description: { type: 'string' }
            },
            required: ['first_name', 'email', 'phone_no', 'address', 'postal_code', 'company_name', 'current_position']
        });
    },
}
