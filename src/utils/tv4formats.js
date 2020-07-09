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
    // email validation
    'email': (data) => {
        if (!_.isEmpty(data)) {
            return validator.isEmail(data) ? null : 'Please enter valid email address';
        }  
        return null;
    },
    // check string should not be blank or empty
    'notEmpty': (data) => {
        return (data.length > 0 && !/^\s+$/.test(data)) ? null : 'Should not be empty or blank.';
    },
    // Only alphabet
    'strictAlphabet': (data) => {
        if (data.length) {
            return (/^[A-Za-z]+$/.test(data)) ? null : 'Should only contain alphabets.';
        }
        return null;
    },
    // Only alphabet
    'alphabetWithSpace': (data) => {
        return (data.length > 0 && /^[A-Za-z ]+$/.test(data)) ? null : 'Only Alphabet and Space are allowed';
    },
    // string parcelable to a number
    'numberString': (data) => {
        return !isNaN(data) ? null : 'Should be a numeric';
    },
    // canada postal code validation
    'canadaPostalCode': (data) => {
        return (data.length > 0 && /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(data)) ? null : 'Please enter valid postal code'
    } 
}
