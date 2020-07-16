const _ = require('lodash');
const User = require('../models/user.model');
const CustomError = require('../utils/error');
const { createToken } = require('../utils/common');
const pricingRepository = require('../repository/pricing.repository');

module.exports = {
    getPricings: async () => {
        return pricingRepository.find({is_active: true});
    },
    createPricing: async (data) => {
        return pricingRepository.create(data);
    },
    deletePricing: async (pricingId) => {
        await pricingRepository.updateOne({ _id: pricingId }, { is_active: false });
    },
    getPricingById: async (pricingId) => {
        let pricing = await pricingRepository.findOne({ _id: pricingId })
        if (!pricing) throw new CustomError(404, 'Pricing not found');

        return pricing;
    },
    updatePricing: async (pricingId, data) => {
        return pricingRepository.findByIdAndUpdate(pricingId, data);
    },
    getAllPricings: async () => {
        return pricingRepository.find({});
    },
}
