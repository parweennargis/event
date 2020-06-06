const _ = require('lodash');
const validator = require('validator');
const mongoose = require('mongoose');

/**
 * Extra formats for tv4 JSON schema validator.
 * @type {Object}
 */
module.exports = {
    // mongodb id validator
    'objectId': function (data) {
        return mongoose.Types.ObjectId.isValid(data) ? null : 'Should be an object id.';
    },

    'email': (data) => {
        if (!_.isEmpty(data)) {
            return validator.isEmail(data) ? null : 'Should be a valid email address';
        }
        return null;
    },

    // check string should not be blank or empty
    'notEmpty': (data) => {
        return (data.length > 0 && !/^\s+$/.test(data)) ? null : 'Should not be empty or blank.';
    }
}
