const UserModel = require('../models/user.model');

class UserRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return UserModel.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query, select = '') {
        return UserModel.findOne(query, select);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, select = '') {
        return UserModel.find(query, select);
    }

    /**
     * Update One Record
     * @param {Object} query
     */
    async updateOne(query, option) {
        return UserModel.updateOne(query, option);
    }

    /**
     * Delete One Record
     * @param {Object} query
     */
    async deleteOne(query) {
        return UserModel.deleteOne(query);
    }

    async findByIdAndUpdate(id, update, options={ new: true }) {
        return UserModel.findByIdAndUpdate(id, update, options);
    }
}
module.exports = new UserRepository();

