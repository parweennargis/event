const SponsorModel = require('../models/sponsor.model');

class SponsorRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return SponsorModel.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return SponsorModel.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return SponsorModel.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} query
     */
    async updateOne(query) {
        return SponsorModel.updateOne(query);
    }

    /**
     * Delete One Record
     * @param {Object} query
     */
    async deleteOne(query) {
        return SponsorModel.deleteOne(query);
    }

    /**
     * Update records if find any
     * @param {ObjectId} id 
     * @param {Object} update 
     * @param {Object} options 
     */
    async findByIdAndUpdate(id, update, options={ new: true }) {
        return SponsorModel.findByIdAndUpdate(id, update, options);
    }
}

module.exports = new SponsorRepository();

