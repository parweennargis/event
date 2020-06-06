const Cart = require('../models/cart.model');
const mongoose = require('mongoose');

class CartRepository {
    /**
     * Insert One Record
     * @param {Object} query
     */
    async create(query) {
        return Cart.create(query);
    }

    /**
     * Find One Record
     * @param {Object} query
     */
    async findOne(query) {
        return Cart.findOne(query);
    }

    /**
     * Find Many Records
     * @param {Object} query
     * @param {String} select
     */
    async find(query, {select = '', populate = []}) {
        return Cart.find(query, select).populate(populate);
    }

    async findByIdAndUpdate(id, update, options={ new: true }) {
        return Cart.findByIdAndUpdate(id, update, options);
    }

    async delete(query) {
        return Cart.deleteOne(query);
    }

    async deleteMany(query) {
        return Cart.deleteMany(query);
    }

    async getCart(userId) {
        const aggregate = Cart.aggregate([
            { $match: { user: mongoose.Types.ObjectId(userId) } },
            { $lookup: { 
                from: 'events',
                localField: 'event',
                foreignField: '_id',
                as: 'event'
             } },
             { $unwind: '$event' },
             { $lookup: { 
                from: 'pricings',
                localField: 'pricing',
                foreignField: '_id',
                as: 'pricing'
             } },
             { $unwind: '$pricing' },
            { $group:{
                "_id": "$event",
                "plans":{"$push": { pricing: '$pricing', price: '$price', total_price: '$total_price', quantity: '$quantity', createdAt: '$createdAt', updatedAt: '$updatedAt', cartId: '$_id', tax: '$tax' }},
                "price": { $sum: "$price" },
                "tax": { $sum: "$tax" }
            }},
            { $sort: { 'plans.updatedAt': 1,  } },
            { $project: { _id: 0, event: '$_id', plans: 1, price: 1, tax: 1 } }
        ]);

        return aggregate.exec();
    }
}

module.exports = new CartRepository();

