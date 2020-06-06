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
    }
}
