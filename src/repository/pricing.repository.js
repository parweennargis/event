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

    /**
     * Update records if find any
     * @param {ObjectId} id 
     * @param {Object} update 
     * @param {Object} options 
     */
    async findByIdAndUpdate(id, update, options={ new: true }) {
        return Pricing.findByIdAndUpdate(id, update, options);
    }
}

module.exports = new PricingRepository();

