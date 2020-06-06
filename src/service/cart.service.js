const mongoose = require('mongoose');
const cartRepository = require('../repository/cart.repository');
const pricingRepository = require('../repository/pricing.repository');
const eventRepository = require('../repository/event.repository');
const eventModel = require('../models/event.model');
const pricingModel = require('../models/pricing.model');

const CustomError = require('../utils/error');

module.exports = {
    getUserCart: async (userId) => {
        const populate = [
            { path: 'event', model: eventModel },
            { path: 'pricing', model: pricingModel }
        ];

        // return cartRepository.find({ user: mongoose.Types.ObjectId(userId) }, { populate });
        return cartRepository.getCart(userId);
    },
    addItemInCart : async (data, userId) => {
        // await cartRepository.deleteMany({ user: userId })
        const { quantity, eventId, pricingId } = data;
        const eventPopulate = [
            { path: 'pricing', model: pricingModel }
        ];
        const [ cart, event ] = await Promise.all([
            cartRepository.findOne({ user: userId, event: eventId, pricing: pricingId }), 
            eventRepository.findOne({ _id: eventId, is_active: true }, eventPopulate)
        ]);
        if (!event) {
            throw new CustomError(400, 'Event does not exists');
        }
        const [chosenPricing] = event.pricing.filter(pricing => pricing.id === pricingId);
        if (!chosenPricing) {
            throw new CustomError(400, 'Please choose correct pricing plan');
        }
        // //TODO: tax calculation
        const price = chosenPricing.amount * quantity;
        const tax = 0;
        const total_price = price + tax;
        if (!cart) {
            return cartRepository.create({ quantity, event: eventId, pricing: pricingId, user: userId, price, total_price });
        }
        cart.price = price;
        cart.quantity = quantity;
        cart.tax = tax;
        cart.total_price = total_price;
        return cart.save();
    },
    deleteItemFromCart: async (cartId, userId) => {
        const query = { _id: mongoose.Types.ObjectId(cartId), user: userId };
        return cartRepository.delete(query);
    }
}