const EventCategory = require('../models/eventCategory.model');

class EventCategoryRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return EventCategory.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return EventCategory.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return EventCategory.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} condition
     * @param {String} statement
     */
    async updateOne(condition, statement) {
        return EventCategory.updateOne(condition, statement);
    }

    async findByIdAndUpdate(id, update, options={ new: true }) {
        return EventCategory.findByIdAndUpdate(id, update, options);
    }
}

module.exports = new EventCategoryRepository();

