const Pricing = require('../models/pricing.model');

class PricingRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return Pricing.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return Pricing.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return Pricing.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} condition
     * @param {String} statement
     */
    async updateOne(condition, statement) {
        return Pricing.updateOne(condition, statement);
    }
}

module.exports = new PricingRepository();

