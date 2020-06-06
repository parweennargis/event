const EventModel = require('../models/event.model');

class EventRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return EventModel.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query, populate = []) {
        return EventModel.findOne(query).populate(populate);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return EventModel.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} query
     */
    async updateOne(query) {
        return EventModel.updateOne(query);
    }

    /**
     * Delete One Record
     * @param {Object} query
     */
    async deleteOne(query) {
        return EventModel.deleteOne(query);
    }

    /**
     * Update records if find any
     * @param {ObjectId} id 
     * @param {Object} update 
     * @param {Object} options 
     */
    async findByIdAndUpdate(id, update, options={ new: true }) {
        return EventModel.findByIdAndUpdate(id, update, options);
    }

    async paginateItems({match, project, skip, limit, sort={ createdAt: 'desc' }}) {
        const aggregate = EventModel.aggregate([]);
        if (match) {
            aggregate.match(match);
        }
        if (project) {
            aggregate.project(project);
        }
        if (skip) {
            aggregate.skip(skip);
        }
        if (limit) {
            aggregate.limit(limit);
        }
        if (sort) {
            aggregate.sort(sort);
        }

        return aggregate.exec();
    }

    async count(query) {
        return EventModel.countDocuments(query);
    }
}
module.exports = new EventRepository();

