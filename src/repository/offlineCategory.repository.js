const OfflineCategory = require('../models/offlineCategory.model');

class OfflineCategoryRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return OfflineCategory.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return OfflineCategory.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return OfflineCategory.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} condition
     * @param {String} statement
     */
    async updateOne(condition, statement) {
        return OfflineCategory.updateOne(condition, statement);
    }

    async findByIdAndUpdate(id, update, options = { new: true }) {
        return OfflineCategory.findByIdAndUpdate(id, update, options);
    }
}

module.exports = new OfflineCategoryRepository();

