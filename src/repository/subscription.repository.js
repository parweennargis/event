const SubscriptionModel = require('../models/subscription.model');

class SubscriptionRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return SubscriptionModel.create(query);
    }
}

module.exports = new SubscriptionRepository();
