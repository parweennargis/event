const mongoose = require('mongoose');
const { createHash } = require('../utils/common');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'First Name is required']
    },
    last_name: {
        type: String
    },
    email: {
        type: Schema.Types.String,
        required: [true, 'email is required'],
        unique: [true, 'email already exists']
    },
    password: {
        type: Schema.Types.String,
        required: [true, 'password is required']
    },
    role_type: {
        type: Schema.Types.String,
        enum: ['EXHIBITOR', 'JOBSEEKER', 'ATTENDEE', 'EVENT_ORGANISER']
    },
    company_name: {
        type: Schema.Types.String
    },
    company_website: {
        type: Schema.Types.String
    },
    phone_no: {
        type: Schema.Types.String
    },
    address: {
        type: Schema.Types.String
    },
    city: {
        type: Schema.Types.String
    },
    province: {
        type: Schema.Types.String
    },
    postal_code: {
        type: Schema.Types.String
    },
    fax: {
        type: Schema.Types.String
    },
    link: {
        resume: {
            type: Schema.Types.String
        },
        logo: {
            type: Schema.Types.String
        }
    },
    heard_about: {
        type: Schema.Types.String
    },
    occupation: {
        type: Schema.Types.String
    },
    occupation_looking_for: {
        type: Schema.Types.String
    },
    total_experience: Schema.Types.String,
    current_position: Schema.Types.String,
    reset_password: {
        token: Schema.Types.String,
        expiryDate: Schema.Types.Date
    },
    business_type: Schema.Types.String,
    business_description: Schema.Types.String,
    event_follows: {
        type: [Schema.Types.ObjectId]
    },
    license_type: Schema.Types.String,
    license_number: Schema.Types.String,
    license_date_of_expiry: Schema.Types.String,
    driving_record_rating: Schema.Types.String,
    is_active: {
        type: Schema.Types.Boolean,
        default: false
    },
    activate_account: {
        token: Schema.Types.String,
        expiryDate: Schema.Types.Date
    }
    // TODO: profile elemnent track
    // profile_element_track: { 
    //  type: [Schema.Types.String]   
    // }
}, {
    timestamps: true
});

userSchema.statics.HashPassword = function (password) {
    return createHash(password);
}

module.exports = mongoose.model('User', userSchema);
