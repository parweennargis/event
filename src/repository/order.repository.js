const Order = require('../models/order.model');

class OrderRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return Order.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return Order.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     * @param {Array} populate
     */
    async find(query, {select = '', populate = []}) {
        return Order.find(query, select).populate(populate);
    }

    async findByIdAndUpdate(id, update, options={ new: true }) {
        return Order.findByIdAndUpdate(id, update, options);
    }

    async delete(query) {
        return Order.deleteOne(query);
    }

    async deleteMany(query) {
        return Order.deleteMany(query);
    }
}

module.exports = new OrderRepository();

