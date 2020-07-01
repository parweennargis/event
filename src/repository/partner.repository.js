const PartnerModel = require('../models/partner.model');

class PartnerRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return PartnerModel.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return PartnerModel.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return PartnerModel.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} query
     */
    async updateOne(query) {
        return PartnerModel.updateOne(query);
    }

    /**
     * Delete One Record
     * @param {Object} query
     */
    async deleteOne(query) {
        return PartnerModel.deleteOne(query);
    }

    /**
     * Update records if find any
     * @param {ObjectId} id 
     * @param {Object} update 
     * @param {Object} options 
     */
    async findByIdAndUpdate(id, update, options={ new: true }) {
        return PartnerModel.findByIdAndUpdate(id, update, options);
    }
}

module.exports = new PartnerRepository();

