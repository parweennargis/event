const pricingService = require('../service/pricing.service');
const validatePricing = require('../validateRequest/pricing');

module.exports = {
    createPricing: async (req, res) => {
        try {
            const { body } = req;
            // validate the register request
            validatePricing.createPricing(body);
            const pricing = await pricingService.createPricing(body);
            return res.json({ data: pricing });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getPricings: async (req, res) => {
        try {
            const pricings = await pricingService.getPricings();
            return res.json({ data: pricings });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    deletePricing: async (req, res) => {
        try {
            const { params: { pricingId } } = req;
            const pricings = await pricingService.deletePricing(pricingId);
            return res.json({ data: 'Pricing deleted successfully' });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    }
};
