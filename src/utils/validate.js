const _ = require('lodash');
const tv4 = require('tv4');
const CustomError = require('../utils/error');

// add formats
tv4.addFormat(require('./tv4formats'));

/**
 * Validate data against schema.
 * Throws API error if data is invalid.
 *
 * @param {*} data data to validate.
 * @param {object} schema tv4 schema object.
 */
module.exports = function validate(data, schema) {
    // default options
    schema = _.defaults(schema, { additionalProperties: false });

    // validate
    const result = tv4.validateResult(data, schema, false, true);

    // proceed if valid
    if (result.valid) return;

    // extract error message
    let message;
    if (_.has(result.error, 'dataPath') && result.error.dataPath.length) {
        message = `${result.error.message} at ${result.error.dataPath}`;
    } else {
        message = result.error.message;
    }

    // send validation error with message
    throw new CustomError(400, message)
};
