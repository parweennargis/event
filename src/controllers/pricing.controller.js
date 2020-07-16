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
    },
    updatePricing: async (req, res) => {
        try {
            const { body, params: { pricingId } } = req;
            // validate pricing request
            validatePricing.createPricing(body);

            // update pricing
            body.is_active = body.is_active === 'true' ? true : false;
            const pricing = await pricingService.updatePricing(pricingId, body);
            return res.json({ data: pricing });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getPricingById: async (req, res) => {
        try {
            const { params: { pricingId } } = req;
            const pricing = await pricingService.getPricingById(pricingId);

            return res.json({ data: pricing });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
    getAllPricings: async (req, res) => {
        try {
            const pricings = await pricingService.getAllPricings();
            return res.json({ data: pricings });
        } catch (error) {
            return res.status(400).json({ errors: error.errors || error.message });
        }
    },
};
